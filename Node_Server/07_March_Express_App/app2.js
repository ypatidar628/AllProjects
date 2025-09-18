import express from "express";

const server = express();

server.get("/",(req,res)=>{
   res.send("<h1 style='color : red'>Home page invoked...</h1>");
    
})
// server.listen(8989);
server.listen(8989,()=>{
    console.log("Server Invoked...");
})