import { API_URL } from "@/utils/consts";
import { TTicket } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const fetchMyTickets = (userId: number) =>
  fetch(`${API_URL}/Ticket/UserTickets?userId=${userId}`).then((res) =>
    res.json()
  );

const fetchTickets = () =>
  fetch(`${API_URL}/Ticket/AllTickets`).then((res) => res.json());

export default function useTickets(userId?: number) {
  const { data, isLoading, refetch } = useQuery<TTicket>({
    queryKey: ["tickets", userId],
    queryFn: () => (userId ? fetchMyTickets(userId) : fetchTickets()),
    staleTime: Infinity,
  });

  return {
    tickets: data?.$values,
    ticketsLoading: isLoading,
    refetchTickets: refetch,
  };
}
