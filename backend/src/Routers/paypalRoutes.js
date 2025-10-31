import express from "express";
import {cancelPayPalOrder, completePayPalOrder, createPayPalOrder} from "../Controller/paypalController.js";
import {capturePayment, createPlanSubscription} from '../services/planService.js'
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import userMiddleware from "../Middleware/userMiddleware.js";
import { createBillingPlan, getAllBillingPlans, getBillingPlanDetails } from "../Controller/planController.js";

const paypalRoutes = express.Router();

paypalRoutes.post("/pay",authMiddleware, createPayPalOrder);
paypalRoutes.get("/complete-order",authMiddleware, completePayPalOrder);
paypalRoutes.get("/cancel-order",authMiddleware, cancelPayPalOrder);


// Billing plan
paypalRoutes.post('/createplan', adminMiddleware, createBillingPlan)
paypalRoutes.get('/getallplans', authMiddleware, getAllBillingPlans)
paypalRoutes.get('/getplan', authMiddleware, getBillingPlanDetails)


// Subsription
paypalRoutes.post('/createsubscription',userMiddleware , createPlanSubscription)

export default paypalRoutes;

/*
// todo
1. update plan
2. Active plan
3. Deactive plan 

4. list subscription
5. show subscription details
*/
