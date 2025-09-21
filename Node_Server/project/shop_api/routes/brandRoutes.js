import express from 'express';
import * as brandController from '../controller/brandController.js'
import jwtAuth from '../auth_token/jwtAuth.js';

const route = express.Router();

route.post("/saveBrand",jwtAuth.tokenAuthentic,brandController.saveBrand)
route.get("/viewAllBrand",jwtAuth.tokenAuthentic,brandController.viewAllBrand);
route.post("/serachBrand",jwtAuth.tokenAuthentic,brandController.serachBrand);
route.delete("/deleteBrand",jwtAuth.tokenAuthentic,brandController.deleteBrand);
route.put("/updateBrand/:id",jwtAuth.tokenAuthentic,brandController.updateBrand);

export default route ;