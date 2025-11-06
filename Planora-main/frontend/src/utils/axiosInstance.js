// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001', // aapke backend ka URL
    withCredentials: true,            // cookies send/receive ke liye zaruri
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
