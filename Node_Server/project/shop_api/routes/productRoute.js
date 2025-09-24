import express from 'express';
import * as productController from '../controller/productController.js'
import jwtAuth from '../auth_token/jwtAuth.js';

const route = express.Router();

route.post("/saveProduct",jwtAuth.tokenAuthentic,productController.saveProduct)
route.get("/viewAllProduct",productController.viewAllProduct);
route.delete("/deleteProduct",jwtAuth.tokenAuthentic,productController.deleteProduct);
route.put("/updateProduct/:id",jwtAuth.tokenAuthentic,productController.updateProduct);
route.post("/searchProduct",jwtAuth.tokenAuthentic,productController.searchProduct);


export default route ;