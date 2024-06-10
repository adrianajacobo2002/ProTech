import { API_URL } from "@/utils/consts";
import type { TStats } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const fetchStats = (userId: number) =>
  fetch(`${API_URL}/Ticket/Stats?userId=${userId}`).then((res) => res.json());

export default function useStats(userId: number) {
  const { data, isLoading, refetch } = useQuery<TStats>({
    queryKey: ["stats", userId],
    queryFn: () => fetchStats(userId),
    staleTime: Infinity,
  });

  return {
    stats: data,
    statsLoading: isLoading,
    refetchStats: refetch,
  };
}
