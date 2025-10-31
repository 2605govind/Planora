import express from 'express';
import { getAllProducts, getAllProductsWithDetails } from '../Controller/publicController.js';


const publicRouter = express.Router();


publicRouter.get('/products', getAllProducts)
publicRouter.get('/stats/products', getAllProductsWithDetails);

export default publicRouter;