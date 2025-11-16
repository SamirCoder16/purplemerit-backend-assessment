import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../lib/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { triggerConfetti } from "../utils/triggerConfetti";
import { useAuth } from "../contexts/AuthContext";

const useUpdateName = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data) => {
      toast.success("Profile has been updated!");
      triggerConfetti();
      await updateUser();
      navigate("/");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  let normalizedError = "";
  if (error) {
    normalizedError =
      error?.response?.data?.message || // Backend general message
      error?.response?.data?.errors?.[0]?.msg || // Express-validator message
      error?.message || // Axios or network error
      "Something went wrong!";
  }
  return { updateProfileMutation: mutateAsync, isLoading, error: normalizedError };
};

export default useUpdateName;
