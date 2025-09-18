import http from "http";

const server = http.createServer((req,res)=>{
    console.log("Request received");
    res.write("<h1>Welcome to Node.js</h1>");
    res.write("<h1>Hello</h1>");
    res.end();

})

server.listen(8989)