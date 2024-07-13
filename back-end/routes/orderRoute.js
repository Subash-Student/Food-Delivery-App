import express from "express";
import { listOrder, placeOrder, updateStatus, userOrder } from "../controllers/orderController.js";
import authMidleware from "../middleware/auth.js";


const orderRouter = express.Router();


orderRouter.post("/place",authMidleware,placeOrder);
orderRouter.post("/userorders",authMidleware,userOrder);
orderRouter.get("/list",listOrder);
orderRouter.post("/status",updateStatus)

// WAITING FOR PAYMRNT VERIFICATION

// orderRouter.post("/verify",verifyOrder)


export default orderRouter;
