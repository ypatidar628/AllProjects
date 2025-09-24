import express from "express";
import * as orderContoller from "../controller/orderController.js";

const router = express.Router();

router.post("/add", orderContoller.createOrder);
router.get("/user/:userId", orderContoller.getUserOrders);
router.get("/:id", orderContoller.getOrderById);

// Admin APIs
router.get("/", orderContoller.getAllOrders);
router.put("/:id/status", orderContoller.updateOrderStatus);
router.delete("/:id", orderContoller.deleteOrder);

export default router;
