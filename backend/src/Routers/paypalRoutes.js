import express from "express";
import {cancelPayPalOrder, completePayPalOrder, createPayPalOrder} from "../Controller/paypalController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import userMiddleware from "../Middleware/userMiddleware.js";
import { createBillingPlan, getAllBillingPlans, getBillingPlanDetails, updateBillingPlan, createPlanSubscription, deactivateBillingPlan, refundAndCancelSubcription} from "../Controller/planController.js";

const paypalRoutes = express.Router();

// PayPal Orders

paypalRoutes.post("/orders",authMiddleware, createPayPalOrder);
paypalRoutes.get("/orders/complete",authMiddleware, completePayPalOrder);
paypalRoutes.get("/orders/cancel",authMiddleware, cancelPayPalOrder);


// Billing plan
paypalRoutes.post('/plans', adminMiddleware, createBillingPlan)
paypalRoutes.patch('/plans', adminMiddleware, updateBillingPlan)
paypalRoutes.put('/plans/deactivate/:planId', adminMiddleware, deactivateBillingPlan)
// paypalRoutes.put('/plans/activate/:planId', adminMiddleware, activateBillingPlan)
paypalRoutes.get('/plans', authMiddleware, getAllBillingPlans)
paypalRoutes.get('/plans/:planId', authMiddleware, getBillingPlanDetails)

// refund
paypalRoutes.post('/refund/approve', adminMiddleware, refundAndCancelSubcription);

// Subsription
paypalRoutes.post('/subscriptions/:planId',userMiddleware , createPlanSubscription)


export default paypalRoutes;

/*
// todo
1. update plan
2. Active plan
3. Deactive plan 

4. list subscription
5. show subscription details
*/
