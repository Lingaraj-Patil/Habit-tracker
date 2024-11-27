import axiosInstance from "./axiosConfig";

export const registerUser = async(userData) => {
    const response = await axiosInstance.post("/users/register",userData);
    return response.data;
}

export const loginUser = async(userData) => {
    const response = await axiosInstance.post("/users/login",userData);
    return response.data;
}