import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/providers/ToastProvider";
import { LoadingContext } from "@/providers/LoadingProvider";
import { useSessionCache } from "@/providers/SessionCacheProvider";

import { KnowledgeItemTag } from "@/interfaces/knowledge-item";
import { createKnowledgeTag, deleteKnowledgeTag, getKnowledgeTag, updateKnowledgeTag } from "@/apiRequests/knowledge-hub/api";

const useKnowledgeTagForm = ({
    knowledgeItemId,
    knowledgeTagId,
    onCloseTagModal,
}: {
    knowledgeItemId: number,
    knowledgeTagId?: number,
    onCloseTagModal?: () => void,
}) => {
    const { showToast } = useToast();
    const { setIsLoading } = useContext(LoadingContext);
    const queryClient = useQueryClient();
    const { data: session } = useSessionCache()

    // Get knowledge tag detail
    const { data: knowledgeTag } = useQuery({
        queryKey: ["knowledge-tag", knowledgeTagId],
        queryFn: () => getKnowledgeTag(Number(knowledgeTagId)),
        enabled: !!knowledgeTagId && !!session?.accessToken,
        retry: 3,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const deleteKnowledgeTagMutation = useMutation({
        mutationFn: async (id: number) => {
            setIsLoading(true)
            const response = await deleteKnowledgeTag(id)
            return response.data;
        },
        onSuccess: () => {
            console.log(knowledgeItemId)
            queryClient.invalidateQueries({ queryKey: ["knowledge-item", knowledgeItemId] })
            showToast({
                description: "Xoá tag thành công!",
                variant: 'success',
            });
        },
        onError: () => {
            showToast({
                description: "Xoá tag thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const createKnowledgeTagMutation = useMutation({
        mutationFn: async (data: Partial<KnowledgeItemTag>) => {
            setIsLoading(true)
            const response = await createKnowledgeTag(data)
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["knowledge-item", data.knowledgeItemId] })
            onCloseTagModal?.()
            showToast({
                description: "Thêm tag thành công!",
                variant: 'success',
            });
        },
        onError: () => {
            showToast({
                description: "Thêm tag thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const updateKnowledgeTagMutation = useMutation({
        mutationFn: async (data: Partial<KnowledgeItemTag>) => {
            setIsLoading(true)
            const response = await updateKnowledgeTag(data.knowledgeItemId || 0, {
                name: data.name,
            })
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["knowledge-item", data.knowledgeItemId] })
            onCloseTagModal?.()
            showToast({
                description: "Cập nhật tag thành công!",
                variant: 'success',
            });
        },
        onError: () => {
            showToast({
                description: "Cập nhật tag thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const handleDeleteKnowledgeTag = (id: number) => {
        deleteKnowledgeTagMutation.mutate(id);
    }

    const handleCreateKnowledgeTag = (data: Partial<KnowledgeItemTag>) => {
        createKnowledgeTagMutation.mutate(data);
    }

    const handleUpdateKnowledgeTag = (data: Partial<KnowledgeItemTag>) => {
        updateKnowledgeTagMutation.mutate(data);
    }

    return {
        knowledgeTag: knowledgeTag,
        handleDeleteKnowledgeTag,
        handleCreateKnowledgeTag,
        handleUpdateKnowledgeTag
    }
}

export default useKnowledgeTagForm