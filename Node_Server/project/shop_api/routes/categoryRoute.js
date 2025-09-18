import express from 'express';
import * as categoryController from '../controller/categoryController.js'
import jwtAuth from '../auth_token/jwtAuth.js';

const route = express.Router();

route.post("/saveCategory",jwtAuth.tokenAuthentic,categoryController.saveCategory)
route.get("/viewAllCategory",jwtAuth.tokenAuthentic,categoryController.viewAllCategory);
route.post("/searchCategory",jwtAuth.tokenAuthentic,categoryController.searchCategory);
route.delete("/deleteCategory",jwtAuth.tokenAuthentic,categoryController.deleteCategory);
route.put("/updateCategory/:id",jwtAuth.tokenAuthentic,categoryController.updateCategory);

export default route ;