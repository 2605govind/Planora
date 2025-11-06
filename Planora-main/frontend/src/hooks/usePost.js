import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance.js";

export const usePost = (url) => {
    const mutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance.post(url, data);
            return response.data;
        }
    })
    // console.log("sfsd", mutation)
    return mutation;
}