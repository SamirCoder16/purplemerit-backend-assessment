import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("You have been logged out!");
      queryClient.clear(); // clears all user data
      window.location.reload();
    },
  });

  let normalizedError = "";
  if (error) {
    normalizedError =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      error?.message ||
      "Something went wrong!";
  }

  return { logoutMutation: mutateAsync, isLoading, error: normalizedError };
};
