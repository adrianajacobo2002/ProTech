import { API_URL } from "@/utils/consts";
import { TUser, TUserResponse } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchUsers = fetch(`${API_URL}/User/GetAll`).then((res) => res.json());

export default function useUsers() {
  const { data, isLoading, refetch } = useQuery<TUserResponse>({
    queryKey: ["users"],
    queryFn: () => fetchUsers,
    placeholderData: keepPreviousData,
  });

  return {
    users: data?.$values,
    usersLoading: isLoading,
    refetchUsers: refetch,
  };
}
