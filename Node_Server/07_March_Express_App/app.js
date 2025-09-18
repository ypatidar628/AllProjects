import express from "express";

const server = express();

// server.listen(8989);
server.listen(8989,()=>{
    console.log("Server Invoked...");
})