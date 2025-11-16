import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPassword } from "../lib/api";
import { triggerConfetti } from "../utils/triggerConfetti";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutateAsync, isLoading, error } = useMutation({
        mutationFn: resetPassword,
        onSuccess: async (data) => {
            toast.success(data?.message || "Password reset successful");
            triggerConfetti();
            navigate("/auth/register");
            await queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    });

    let normalizeError = "";
    if (error) {
        normalizeError =
            error?.response?.data?.message || // Backend general message
            error?.response?.data?.errors?.[0]?.msg || // Express-validator message
            error?.message || // Axios or network error
            "Something went wrong!";
    }

    return { resetPasswordMutation: mutateAsync, isLoading, error: normalizeError };
};

export default useResetPassword;