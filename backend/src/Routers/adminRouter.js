import express from 'express';
import { createProduct, updateProduct , deleteProduct} from '../Controller/adminController.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';
import { createBillingPlan, deactivatePlan, updatePlan } from '../Controller/planController.js';

const adminRouter = express.Router();

adminRouter.use(adminMiddleware)

adminRouter.post('/products', createProduct)        
adminRouter.put('/products/:productId', updateProduct);        
adminRouter.delete('/product/:productId', deleteProduct);        

// plan
// adminRouter.post('/plan', createBillingPlan);        
// adminRouter.patch('/plan/:id', updatePlan);        
// adminRouter.delete('/plans/:id', deactivatePlan);        

export default adminRouter;