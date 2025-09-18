import express from 'express';
const route = express.Router();

route.get("/",(req,res)=>{
    res.send("Admin Home Invoked....");
})
route.get("/viewAllUser",(req,res)=>{
    res.send("Admin View All User Invoked....");
})
route.get("/viewProduct",(req,res)=>{
    res.send("Admin View Product Invoked....");
})
route.get("/viewManager",(req,res)=>{
    res.send("Admin View Manager Invoked....");
})


export default route;