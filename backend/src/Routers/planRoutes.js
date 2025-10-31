import express from 'express';
import { createBillingPlan, getAllActivePlans, getAllBillingPlans, getBillingPlanDetails } from '../Controller/planController.js';
import authMiddleware from '../Middleware/authMiddleware.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';
import { createPlanSubscription } from '../services/planService.js';


const planRoutes = express.Router();

planRoutes.get('/plans',authMiddleware, getAllActivePlans)

planRoutes.post('/create/plan', adminMiddleware, createBillingPlan)

planRoutes.get('/getallplans', authMiddleware, getAllBillingPlans)
planRoutes.get('/getplan', authMiddleware, getBillingPlanDetails)
planRoutes.post('/create/subscription', authMiddleware, createPlanSubscription)



export default planRoutes;