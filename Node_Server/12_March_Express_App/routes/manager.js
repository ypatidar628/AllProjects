import express from 'express';
const route = express.Router();

route.get("/",(req,res)=>{
    res.send("Manager Home Invoked....");
})
route.get("/viewProfile",(req,res)=>{
    res.send("Manager View Profile Invoked....");
})
route.get("/viewOrder",(req,res)=>{
    res.send("Manager View Order Invoked....");
})


export default route;