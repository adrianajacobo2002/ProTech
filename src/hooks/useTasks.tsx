import { API_URL } from "@/utils/consts";
import { TTicketAdditionalTask } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchTasks = (employeeId: number) =>
  fetch(`${API_URL}/Task/GetTasks?employeeId=${employeeId}`).then((res) =>
    res.json()
  );

export default function useTasks(employeeId: number) {
  const { data, isLoading, refetch } = useQuery<Response>({
    queryKey: ["tasks", employeeId],
    queryFn: () => fetchTasks(employeeId),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  return {
    tasks: data?.$values,
    tasksLoading: isLoading,
    reloadTasks: refetch,
  };
}

type Response = {
  $values: TTicketAdditionalTask[];
};
