import { useQuery } from "@tanstack/react-query";
import { getOnlyUsersForAdmin } from "../lib/api.js";

export const useGetAllUserforAdmin = (page, limit) => {
  return useQuery({
    queryKey: ["admin-all-users", page, limit],
    queryFn: () => getOnlyUsersForAdmin({ page, limit }),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
