import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance.js";


export const useGet = (url, params = {}, options = {}) => {
  return useQuery({
    queryKey: [url, params], 
    queryFn: async () => {
      const response = await axiosInstance.get(url, { params });
      return response.data ?? {}; 
    },
    ...options, 
  });
};