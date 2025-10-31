import axiosInstance from "./axiosInstance";

// Admin
export async function createBillingPlan(data) {
    const res = await axiosInstance.post('/api/paypal/')
}



export async function getAllBillingPlans() {
    const res = await axiosInstance.get('/api/paypal/plans')
    return res.data.plans
}