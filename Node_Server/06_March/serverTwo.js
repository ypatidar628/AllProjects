import http from "http";

const server = http.createServer((req,res)=>{
    console.log("Request received");
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write("<h1>Welcome to Node.js</h1>");
    res.write("<h1>Hello</h1>");
    res.end();

})

server.listen(8989)
// Run the serverTwo.js file using the command node serverTwo.js