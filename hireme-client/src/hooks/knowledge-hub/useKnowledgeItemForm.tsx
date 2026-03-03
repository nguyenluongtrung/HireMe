import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/providers/ToastProvider";
import { LoadingContext } from "@/providers/LoadingProvider";
import { useSessionCache } from "@/providers/SessionCacheProvider";

import { KnowledgeItem } from "@/interfaces/knowledge-item";

import { createKnowledgeItem, deleteKnowledgeItem, getKnowledgeItem, updateKnowledgeItem } from "@/apiRequests/knowledge-hub/api";

const useKnowledgeItemForm = ({
    knowledgeItemId,
    onGettingDetailSuccess
}: {
    knowledgeItemId?: number
    onGettingDetailSuccess?: (data: KnowledgeItem) => void
}) => {
    const { showToast } = useToast();
    const { setIsLoading } = useContext(LoadingContext);
    const queryClient = useQueryClient();
    const { data: session } = useSessionCache()

    // Get knowledge item detail
    const { data: knowledgeItem } = useQuery({
        queryKey: ["knowledge-item", knowledgeItemId],
        queryFn: () => getKnowledgeItem(Number(knowledgeItemId)),
        enabled: !!knowledgeItemId && !!session?.accessToken,
        retry: 3,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            onGettingDetailSuccess?.(data.data)
        }
    })

    const deleteKnowledgeItemMutation = useMutation({
        mutationFn: async (id: number) => {
            setIsLoading(true)
            const response = await deleteKnowledgeItem(id)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Xoá bài viết thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["knowledge-resources"],
            })
        },
        onError: () => {
            showToast({
                description: "Xoá bài viết thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const createKnowledgeItemMutation = useMutation({
        mutationFn: async (data: Partial<KnowledgeItem>) => {
            setIsLoading(true)
            const response = await createKnowledgeItem(data)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Thêm bài viết thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["knowledge-resources"],
            })
        },
        onError: () => {
            showToast({
                description: "Thêm bài viết thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const updateKnowledgeItemMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number, data: Partial<KnowledgeItem> }) => {
            setIsLoading(true)
            const response = await updateKnowledgeItem(id, data)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Cập nhật bài viết thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["knowledge-resources"],
            })
        },
        onError: () => {
            showToast({
                description: "Cập nhật bài viết thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const handleDeleteKnowledgeItem = (id: number) => {
        deleteKnowledgeItemMutation.mutate(id);
    }

    const handleCreateKnowledgeItem = (data: Partial<KnowledgeItem>) => {
        console.log(data)
        createKnowledgeItemMutation.mutate(data);
    }

    const handleUpdateKnowledgeItem = (id: number, data: Partial<KnowledgeItem>) => {
        updateKnowledgeItemMutation.mutate({ id, data });
    }

    return {
        knowledgeItem: knowledgeItem,
        handleDeleteKnowledgeItem,
        handleCreateKnowledgeItem,
        handleUpdateKnowledgeItem
    }
}

export default useKnowledgeItemForm