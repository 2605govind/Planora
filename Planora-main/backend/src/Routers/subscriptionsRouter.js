import express from 'express';
import { createPaypalPlan } from '../Controller/subscriptionsController.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';

const subscriptionsRouter = express.Router();

subscriptionsRouter.post('/plans',adminMiddleware, createPaypalPlan)


export default subscriptionsRouter;