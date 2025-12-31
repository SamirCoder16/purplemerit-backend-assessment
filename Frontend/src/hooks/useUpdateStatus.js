import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUserStatustoActive,
  updateUserStatustoInActive,
} from "../lib/api";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

export const useUpdateStatusToActive = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  const result = useMutation({
    mutationKey: ["updateUserStatustoActive"],
    mutationFn: async (userId) => updateUserStatustoActive(userId),
    onSuccess: async (data) => {
      toast.success(data.message);
      await updateUser();
      queryClient.invalidateQueries({ queryKey: ["admin-all-users"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    },
  });
  return result;
};

export const useUpdateStatusToInActive = () => {
  const { updateUser } = useAuth();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ["updateUserStatusToInActive"],
    mutationFn: async (userId) => updateUserStatustoInActive(userId),
    onSuccess: async (data) => {
      toast.success(data.message);
      await updateUser();
      queryClient.invalidateQueries({ queryKey: ["admin-all-users"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    },
  });
  return result;
};
