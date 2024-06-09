import { API_URL } from "@/utils/consts";
import { TEmployee } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSupports = () =>
  fetch(`${API_URL}/User/GetEmployees`).then((res) => res.json());

export default function useSupports() {
  const { data, isLoading, refetch } = useQuery<TEmployee[]>({
    queryKey: ["employees"],
    queryFn: fetchSupports,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return {
    supports: data ?? [],
    supportsLoading: isLoading,
    reloadSupports: refetch,
  };
}
