import express from 'express';
import userMiddleware from '../Middleware/userMiddleware.js';
import { purchaseProduct, getAllPurchase } from '../Controller/userController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/purchase/:productId', userMiddleware, purchaseProduct);
userRouter.get('/',authMiddleware, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Auth User",
        user: req.user
    });
});

userRouter.get('/allpurchase', userMiddleware, getAllPurchase)

export default userRouter;