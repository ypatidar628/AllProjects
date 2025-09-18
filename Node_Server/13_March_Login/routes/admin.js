import express from "express"
const route = express.Router();

route.get("/",(req,res)=>{
    res.send("Admin Home or Admin Index URL Inoked : ");
})
route.get("/viewAllUser",(req,res)=>{
    res.send("View All User URL Inoked : ");
})
route.get("/viewProduct",(req,res)=>{
    res.send("View Product URL Inoked : ");
})
route.get("/viewManager",(req,res)=>{
    res.send("View Manager URL Inoked : ");
})

export default route;