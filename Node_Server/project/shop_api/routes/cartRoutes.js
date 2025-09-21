// routes/cartRoutes.js
import express from "express";
import * as cartController from "../controller/cartController.js";
import jwtAuth from '../auth_token/jwtAuth.js';


const router = express.Router();

router.post("/add", cartController.addCart);
router.get("/",  cartController.getCart);
router.put("/update", jwtAuth.tokenAuthentic, cartController.updateCart);
router.delete("/remove/:productId", jwtAuth.tokenAuthentic, cartController.removeCartItem);
router.delete("/clear", jwtAuth.tokenAuthentic, cartController.removeCart);

export default router;
