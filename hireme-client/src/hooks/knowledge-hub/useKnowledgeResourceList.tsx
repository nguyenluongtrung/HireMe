import { useInfiniteQuery } from "@tanstack/react-query";

import { useSessionCache } from "@/providers/SessionCacheProvider";
import { useToast } from "@/providers/ToastProvider";

import { ERROR_COMMON_MESSAGE } from "@/contants/message";

import { Pagination } from "@/interfaces/pagination";
import { KnowledgeResource } from "@/interfaces/knowledge-item";

import { getKnowledgeResources } from "@/apiRequests/knowledge-hub/api";

const useKnowledgeResourceList = ({
  limit = 10,
  searchDebounce,
  onSuccess,
}: {
  limit?: number;
  searchDebounce?: string;
  onSuccess?: (data: Pagination<KnowledgeResource[]>) => void;
}) => {
  const { data: session } = useSessionCache();
  const { showToast } = useToast();

  const token = session?.accessToken;

  const query = useInfiniteQuery({
    queryKey: ["knowledge-resources", limit, searchDebounce],

    queryFn: ({ pageParam = 1 }) =>
      getKnowledgeResources({
        page: pageParam,
        limit,
        searchDebounce,
      }),

    enabled: !!token,

    retry: 1,

    refetchOnWindowFocus: false,

    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNextPage) return undefined;

      return Number(lastPage.data.page) + 1;
    },

    onSuccess: (data) => {
      const latestPage = data.pages[data.pages.length - 1];
      onSuccess?.(latestPage.data);
    },

    onError: () => {
      showToast({
        variant: "error",
        description: ERROR_COMMON_MESSAGE,
      });
    },
  });

  const resources =
    query.data?.pages.flatMap((page) => page.data.data) ?? [];

  return {
    data: resources,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
};

export default useKnowledgeResourceList;