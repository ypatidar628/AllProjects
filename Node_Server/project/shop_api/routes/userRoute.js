import express from 'express';
/*import { deleteUser, loginUser, saveUser, updateUser, viewAllUser } from '../controller/userController';*/
import * as userController from '../controller/userController.js'
import jwtAuth from '../auth_token/jwtAuth.js';

const route = express.Router();

/*
route.post("/saveUser",saveUser);
route.post("/loginUser",loginUser);
route.get("/viewAllUser",viewAllUser);
route.delete("/deleteUser",deleteUser);
route.put("/updateUser",updateUser); 
*/

route.post("/saveUser",userController.saveUser)
route.post("/loginUser",userController.loginUser);
route.post("/OTPMatch",userController.OTPVerification);
route.get("/viewAllUser",jwtAuth.tokenAuthentic,userController.viewAllUser);
route.put("/changePassword",jwtAuth.tokenAuthentic,userController.changePassword);
route.get("/loginUserInfo",jwtAuth.tokenAuthentic,userController.loginUserInfo);
route.get("/viewSpecificUserInfo/:id",jwtAuth.tokenAuthentic,userController.viewSpecificUserInfo);


route.delete("/deleteUser",userController.deleteUser);
route.put("/updateUser",userController.updateUser);

export default route ;