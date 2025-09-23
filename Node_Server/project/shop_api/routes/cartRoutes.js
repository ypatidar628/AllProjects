// routes/cartRoutes.js
import express from "express";
import * as cartController from "../controller/cartController.js";
import jwtAuth from '../auth_token/jwtAuth.js';


const router = express.Router();

router.post("/add",jwtAuth.tokenAuthentic,cartController.addCart);
router.get("/get/:userId",jwtAuth.tokenAuthentic,cartController.getCart);
router.put("/update/:id", jwtAuth.tokenAuthentic, cartController.updateCart);
router.delete("/remove/:productId" , jwtAuth.tokenAuthentic , cartController.removeCartItem);
router.delete("/clear/:userId", jwtAuth.tokenAuthentic, cartController.removeCart);

export default router;
