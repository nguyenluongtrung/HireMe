import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/providers/ToastProvider";
import { LoadingContext } from "@/providers/LoadingProvider";

import { createApplication, deleteApplication, updateApplication } from "@/apiRequests/applications/api";

import { Application } from "@/interfaces/application";

const useApplicationForm = () => {
    const { showToast } = useToast();
    const { setIsLoading } = useContext(LoadingContext);
    const queryClient = useQueryClient();

    const deleteApplicationMutation = useMutation({
        mutationFn: async (id: number) => {
            setIsLoading(true)
            const response = await deleteApplication(id)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Xoá đơn ứng tuyển thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["applications"],
            })
            queryClient.invalidateQueries({
                queryKey: ["application-statistics"],
            })
        },
        onError: () => {
            showToast({
                description: "Xoá đơn ứng tuyển thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const createApplicationMutation = useMutation({
        mutationFn: async (data: Partial<Application>) => {
            setIsLoading(true)
            const response = await createApplication(data)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Thêm đơn ứng tuyển thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["applications"],
            })
            queryClient.invalidateQueries({
                queryKey: ["application-statistics"],
            })
        },
        onError: () => {
            showToast({
                description: "Thêm đơn ứng tuyển thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const updateApplicationMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number, data: Partial<Application> }) => {
            setIsLoading(true)
            const response = await updateApplication(id, data)
            return response.data;
        },
        onSuccess: () => {
            showToast({
                description: "Cập nhật đơn ứng tuyển thành công!",
                variant: 'success',
            });
            queryClient.invalidateQueries({
                queryKey: ["applications"],
            })
            queryClient.invalidateQueries({
                queryKey: ["application-statistics"],
            })
        },
        onError: () => {
            showToast({
                description: "Cập nhật đơn ứng tuyển thất bại!",
                variant: 'error',
            });
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    const handleDeleteApplication = (id: number) => {
        deleteApplicationMutation.mutate(id);
    }

    const handleCreateApplication = (data: Partial<Application>) => {
        console.log(data)
        createApplicationMutation.mutate({ ...data, dateApplied: data.dateApplied });
    }

    const handleUpdateApplication = (id: number, data: Partial<Application>) => {
        updateApplicationMutation.mutate({ id, data });
    }

    return {
        handleDeleteApplication,
        handleCreateApplication,
        handleUpdateApplication
    }
}

export default useApplicationForm