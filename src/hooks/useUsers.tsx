import { API_URL } from "@/utils/consts";
import { TUser } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchUsers = fetch(`${API_URL}/User/GetAll`).then((res) => res.json());

export default function useUsers() {
  const { data, isLoading, refetch } = useQuery<TUser[]>({
    queryKey: ["users"],
    queryFn: () => fetchUsers,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  return {
    users: data,
    usersLoading: isLoading,
    refetchUsers: refetch,
  };
}
