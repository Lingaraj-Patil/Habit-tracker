
import axiosInstance from "./axiosConfig";

export const createHabit = async(habitData,token) => {
    const response = await axiosInstance.post("/habits/create",habitData,{
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
}

export const getHabits = async(token)=>{
    const response = await axiosInstance.get("/habits/get/:id",{
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
}

export const markHabitComplete = async(habitId,token) => {
    const response = await axiosInstance.post(`/habits/${habitId}/mark-complete`,{},{
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
}

export const updateHabit = async (id, updates, token) => {
    const response = await axiosInstance.put(
        `/habits/update/${id}`, // Endpoint
        updates, // Data to send in the request body
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};


export const deleteHabit = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axiosInstance.delete(`/habits/delete/${id}`, config);
    return response.data;
};