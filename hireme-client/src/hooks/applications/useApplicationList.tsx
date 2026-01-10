import { useQuery } from "@tanstack/react-query";

import { useSessionCache } from "@/providers/SessionCacheProvider";
import { useToast } from "@/providers/ToastProvider";

import { ERROR_COMMON_MESSAGE } from "@/contants/message";

import { getApplications } from "@/apiRequests/applications/api";

import { Application } from "@/interfaces/application";
import { Pagination } from "@/interfaces/pagination";

const useApplicationList = ({ page, limit, searchDebounce, date, onSuccess }: { page?: number, limit?: number, searchDebounce?: string, date?: Date | undefined, onSuccess?: (data: Pagination<Application[]>) => void }) => {
    const { data: session } = useSessionCache();
    const { showToast } = useToast();

    const token = session?.accessToken;

    const { data, isLoading } = useQuery({
        queryKey: ["applications", page, limit, searchDebounce, date],
        queryFn: () => getApplications({ page: page || 1, limit: limit || 10, searchDebounce, date }),
        enabled: !!token,
        retry: 1,
        staleTime: 1 * 60 * 1000, // 1 minute
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            onSuccess?.(data.data);
        },
        onError: () => {
            showToast({
                variant: "error",
                description: ERROR_COMMON_MESSAGE,
            });
        },
    });

    return {
        data: data?.data,
        isLoading,
    }
}

export default useApplicationList