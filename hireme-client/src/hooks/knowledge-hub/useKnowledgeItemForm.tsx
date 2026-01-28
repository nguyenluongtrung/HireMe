import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/providers/ToastProvider";
import { LoadingContext } from "@/providers/LoadingProvider";

import { KnowledgeItem } from "@/interfaces/knowledge-item";

import { createKnowledgeItem, deleteKnowledgeItem, updateKnowledgeItem } from "@/apiRequests/knowledge-hub/api";

const useKnowledgeItemForm = () => {
    const { showToast } = useToast();
    const { setIsLoading } = useContext(LoadingContext);
    const queryClient = useQueryClient();

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
                queryKey: ["knowledge-items"],
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
                queryKey: ["knowledge-items"],
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
                queryKey: ["knowledge-items"],
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
        handleDeleteKnowledgeItem,
        handleCreateKnowledgeItem,
        handleUpdateKnowledgeItem
    }
}

export default useKnowledgeItemForm