import express from "express";
import { placeOrder, userOrder } from "../controllers/orderController.js";
import authMidleware from "../middleware/auth.js";


const orderRouter = express.Router();


orderRouter.post("/place",authMidleware,placeOrder);
orderRouter.post("/userorders",authMidleware,userOrder);

// WAITING FOR PAYMRNT VERIFICATION

// orderRouter.post("/verify",verifyOrder)


export default orderRouter;
