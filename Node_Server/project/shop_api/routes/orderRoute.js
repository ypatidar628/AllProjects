import express from "express";
import * as orderContoller from "../controller/orderController.js";
import jwtAuth from "../auth_token/jwtAuth.js";

const router = express.Router();

//User APIs
router.post("/add/:userId", jwtAuth.tokenAuthentic , orderContoller.createOrder);
router.get("/user/:userId", jwtAuth.tokenAuthentic , orderContoller.getUserOrders);
router.get("/:id", jwtAuth.tokenAuthentic , orderContoller.getOrderById);
router.delete("/cancelOrder/:id" , jwtAuth.tokenAuthentic , orderContoller.cancelOrder)
router.delete('/cancelOrderById/:id' , jwtAuth.tokenAuthentic , orderContoller.cancelOrderById)

// Admin APIs
router.get("/", jwtAuth.tokenAuthentic , orderContoller.getAllOrders);
router.put("/status/:id", orderContoller.updateOrderStatus);
// router.delete("/:id", orderContoller.deleteOrder);

export default router;
