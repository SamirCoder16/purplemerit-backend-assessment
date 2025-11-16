import { useMutation, useQueryClient } from "@tanstack/react-query";
import { triggerConfetti } from "../utils/triggerConfetti.js";
import toast from "react-hot-toast";
import { signup } from "../lib/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";


const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      console.log(data);
      triggerConfetti();
      toast.success("Booyah! welcome to NEVERMORE.");
      await updateUser();
      navigate("/");
      await queryClient.invalidateQueries({ queryKey: ["all-users"]})
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
  return { registerMutation: mutateAsync, isLoading, error: normalizedError}
};

export default useRegister;