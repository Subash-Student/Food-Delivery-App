import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cartContrpller.js"
import authMidleware from "../middleware/auth.js";


const cartRouter = express.Router();


cartRouter.post('/add',authMidleware,addToCart);
cartRouter.post("/remove",authMidleware,removeFromCart);
cartRouter.post("/get",authMidleware,getCart);

export default cartRouter;