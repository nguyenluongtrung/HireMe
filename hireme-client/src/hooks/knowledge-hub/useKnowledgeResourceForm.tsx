import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/providers/ToastProvider";
import { LoadingContext } from "@/providers/LoadingProvider";

import { KnowledgeResource } from "@/interfaces/knowledge-item";

import { createKnowledgeResource, deleteKnowledgeResource, updateKnowledgeResource } from "@/apiRequests/knowledge-hub/api";

const useKnowledgeResourceForm = () => {
    const { showToast } = useToast();
    const { setIsLoading } = useContext(LoadingContext);
    const queryClient = useQueryClient();

    const deleteKnowledgeResourceMutation = useMutation({
        mutationFn: async (id: number) => {
            setIsLoading(true)
            const response = await deleteKnowledgeResource(id)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Xoá tài nguyên thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["knowledge-resources"],
            })
        },
        onError: () => {
            showToast({
                description: "Xoá tài nguyên thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const createKnowledgeResourceMutation = useMutation({
        mutationFn: async (data: Partial<KnowledgeResource>) => {
            setIsLoading(true)
            const response = await createKnowledgeResource(data)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Thêm tài nguyên thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["knowledge-resources"],
            })
        },
        onError: () => {
            showToast({
                description: "Thêm tài nguyên thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const updateKnowledgeResourceMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number, data: Partial<KnowledgeResource> }) => {
            setIsLoading(true)
            const response = await updateKnowledgeResource(id, data)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Cập nhật tài nguyên thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["knowledge-resources"],
            })
        },
        onError: () => {
            showToast({
                description: "Cập nhật tài nguyên thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const handleDeleteKnowledgeResource = (id: number) => {
        deleteKnowledgeResourceMutation.mutate(id);
    }

    const handleCreateKnowledgeResource = (data: Partial<KnowledgeResource>) => {
        createKnowledgeResourceMutation.mutate(data);
    }

    const handleUpdateKnowledgeResource = (id: number, data: Partial<KnowledgeResource>) => {
        updateKnowledgeResourceMutation.mutate({ id, data });
    }

    return {
        handleDeleteKnowledgeResource,
        handleCreateKnowledgeResource,
        handleUpdateKnowledgeResource
    }
}

export default useKnowledgeResourceForm