import { axiosInstance } from "./axios.js";

export const signup = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
} 
export const login = async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
}
export const getAllUsers = async () => {
    const response = await axiosInstance.get(`/all/users`);
    return response.data;
}

export const getMe = async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
}

export const updateProfile = async ({ userId, userName }) => {
    const response = await axiosInstance.patch(`/auth/update/${userId}`, { userName });
    return response.data;
}
export const forgotPassword = async ({ email }) => {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
}
export const resetPassword = async ({ email, newPassword, otp }) => {
    const response = await axiosInstance.patch(`/auth/reset-password/${email}`, { otp, newPassword });
    return response.data;
}