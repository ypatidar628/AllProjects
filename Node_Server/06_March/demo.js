import http from "http";

const server = http.createServer((req, res) => {
    const myUrl = req.url;
    console.log(myUrl);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    switch (myUrl) {
        case '/': {
            res.write("<h1>Welcome to Node.js Home</h1>");
            break;
        }
        case '/about': {
            res.write("<h1>About Us</h1>");
            break;
        }
        case '/contact': {
            res.write("<h1>Contact Us</h1>");
            break;
        }
        case '/login': {
            res.write("<h1>Login Us</h1>");
            break;
        }
        case '/register': {
            res.write("<h1>Register Us</h1>");
            break;
        }
        default: {
            res.write("<h1>404 Page Not Found</h1>");
            break;

        }
    }
    res.end();
})

server.listen(8989)
// Run the serverTwo.js file using the command node serverTwo.js