/**
 **`POST /orders`** → Place an order
 **`GET /orders`** → List user’s orders
 **`GET /orders/:id`** → Order details
 */


import express from 'express';
import { getOrderById, getUserOrders, placeOrder } from '../../controllers/order.controller.js';
import { requireAuth } from './../../middlewares/auth.middleware.js';
import { verifyApiKey } from '../../middlewares/verifyApiKey.middleware.js';


const orderRouter = express.Router();

orderRouter.use(requireAuth);
orderRouter.use(verifyApiKey);


orderRouter.post("/", placeOrder);
orderRouter.get("/", getUserOrders);
orderRouter.get("/:id", getOrderById);



export default orderRouter;