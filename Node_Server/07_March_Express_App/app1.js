import express from "express";

const server = express();

server.get("/",(req,res)=>{
    console.log("Home page invoked...");
    
})
// server.listen(8989);
server.listen(8989,()=>{
    console.log("Server Invoked...");
})