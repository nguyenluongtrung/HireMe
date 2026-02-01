import { useQuery } from "@tanstack/react-query";

import { useSessionCache } from "@/providers/SessionCacheProvider";
import { useToast } from "@/providers/ToastProvider";

import { ERROR_COMMON_MESSAGE } from "@/contants/message";

import { Pagination } from "@/interfaces/pagination";
import { KnowledgeResource } from "@/interfaces/knowledge-item";

import { getKnowledgeResources } from "@/apiRequests/knowledge-hub/api";

const useKnowledgeResourceList = ({ page, limit, searchDebounce, onSuccess }: { page?: number, limit?: number, searchDebounce?: string, onSuccess?: (data: Pagination<KnowledgeResource[]>) => void }) => {
    const { data: session } = useSessionCache();
    const { showToast } = useToast();

    const token = session?.accessToken;

    const { data, isLoading } = useQuery({
        queryKey: ["knowledge-resources", page, limit, searchDebounce],
        queryFn: () => getKnowledgeResources({ page: page || 1, limit: limit || 10, searchDebounce }),
        enabled: !!token,
        retry: 1,
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

export default useKnowledgeResourceList