import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext.jsx";


const useLogin = () => {
  const { updateUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("welcome back to NEVERMORE!");
      await updateUser();
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user"] });
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

  return { loginMutation: mutateAsync, loginLoading: isLoading, isError, loginError: normalizedError }; 
};

export default useLogin;