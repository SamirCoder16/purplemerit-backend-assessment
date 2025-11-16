import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { forgotPassword } from "../lib/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate("/reset/password");
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  let normalizeError = "";
  if (error) {
    normalizeError =
      error?.response?.data?.message || // Backend general message
      error?.response?.data?.errors?.[0]?.msg || // Express-validator message
      error?.message || // Axios or network error
      "Something went wrong!";
  }

  return { forgotPasswordMutation: mutateAsync, isLoading, error: normalizeError };
};

export default useForgotPassword;
