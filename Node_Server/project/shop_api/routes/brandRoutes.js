import express from 'express';
import * as brandController from '../controller/brandController.js'
import jwtAuth from '../auth_token/jwtAuth.js';

const route = express.Router();

route.post("/savebrand",jwtAuth.tokenAuthentic,brandController.savebrand)
route.get("/viewAllbrand",jwtAuth.tokenAuthentic,brandController.viewAllbrand);
route.post("/searchbrand",jwtAuth.tokenAuthentic,brandController.searchbrand);
route.delete("/deletebrand",jwtAuth.tokenAuthentic,brandController.deletebrand);
route.put("/updatebrand",jwtAuth.generateToken,brandController.updatebrand);

export default route ;