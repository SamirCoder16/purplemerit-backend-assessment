import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/api.js";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
