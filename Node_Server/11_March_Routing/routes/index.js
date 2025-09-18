import express from 'express';
const route = express.Router();

route.get("/",(req,res)=>{
    // res.send("Index Home Invoked....");
    res.render("home",{name:"Yogendra"})
})
route.get("/about",(req,res)=>{
    // res.send("Index About Invoked....");
    res.render("about")
})
route.get("/contact",(req,res)=>{
    // res.send("Index Contact Invoked....");
    res.render("contact")
})
route.get("/login",(req,res)=>{
    // res.send("Index Login Invoked....");
    res.render("login")
})
route.get("/register",(req,res)=>{
    // res.send("Index Register Invoked....");
    res.render("register")
})

export default route;