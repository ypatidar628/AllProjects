import express from "express";

const server = express();

server.get("/",(req,res)=>{
   res.send("<h1 style='color : red'>Home page invoked...</h1>"); 
})
server.get("/about",(req,res)=>{
   res.send("<h1 style='color : red'>About page invoked...</h1>"); 
})
server.get("/contact",(req,res)=>{
   res.send("<h1 style='color : red'>Contact page invoked...</h1>"); 
})
server.get("/login",(req,res)=>{
   res.send("<h1 style='color : red'>Login page invoked...</h1>"); 
})
server.get("/register",(req,res)=>{
   res.send("<h1 style='color : red'>Register page invoked...</h1>"); 
})

server.get("*",(req,res)=>{
   res.send("<h1 style='color : red; text-align:center'>404 | Page Not Found</h1>"); 
})

// server.listen(8989);
server.listen(8989,()=>{
    console.log("Server Invoked...");
})