import express from "express"
const route = express.Router();

route.get("/",(req,res)=>{
    res.send("Manager Home or Admin Index URL Inoked : ");
})
route.get("/viewProfile",(req,res)=>{
    res.send("Manager : View Manager Profile URL Inoked : ");
})
route.get("/viewOrder",(req,res)=>{
    res.send("Manager : View Order URL Inoked : ");
})

export default route;