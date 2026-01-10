import { useQuery } from "@tanstack/react-query"

import { useSessionCache } from "@/providers/SessionCacheProvider";
import { useToast } from "@/providers/ToastProvider";

import { getApplicationStatistics } from "@/apiRequests/applications/api";

import { ERROR_COMMON_MESSAGE } from "@/contants/message";

const useApplicationStatistics = () => {
    const { data: session } = useSessionCache();
    const { showToast } = useToast();

    const token = session?.accessToken;

    const { data, isLoading } = useQuery({
        queryKey: ["application-statistics"],
        queryFn: () => getApplicationStatistics(),
        enabled: !!token,
        retry: 1,
        staleTime: 1 * 60 * 1000, // 1 minute
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
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

export default useApplicationStatistics
