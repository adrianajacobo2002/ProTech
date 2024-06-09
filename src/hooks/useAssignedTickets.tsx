import { API_URL } from "@/utils/consts";
import { TTicket } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchAssignedTickets = (employeeId: number) =>
  fetch(`${API_URL}/Ticket/Assigned?employeeId=${employeeId}`).then((res) =>
    res.json()
  );

export default function useAssignedTickets(employeeId: number) {
  const { data, isLoading, refetch } = useQuery<TTicket>({
    queryKey: ["assigned-tickets", employeeId],
    queryFn: () => fetchAssignedTickets(employeeId),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return {
    assignedTickets: data?.$values ?? [],
    assignedTicketsLoading: isLoading,
    reloadAssignedTickets: refetch,
  };
}
