import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    const myUrl = req.url;
    console.log(myUrl);

    var data1 = "<a href='/'>Home</a>&emsp; <a href='/about'>About</a>&emsp; <a href='/contact'>Contact</a>&emsp; <a href='/login'>Login</a>&emsp; <a href='/register'>Register</a>";

    res.writeHead(200, { 'Content-Type': 'text/html' });
    switch (myUrl) {
        case '/': {
            fs.readFile('./pages/home.html', 'utf8', (err, data) => {
                res.write(data1);   
                res.write(data);
                res.end();
            })
            break;
        }
        case '/about': {
            fs.readFile('./pages/about.html', 'utf8', (err, data) => {
                res.write(data1);
                res.write(data);
                res.end();
            })
            break;
        }
        case '/contact': {
            fs.readFile('./pages/contact.html', 'utf8', (err, data) => {
                res.write(data1);
                res.write(data);
                res.end();
            })
            break;
        }
        case '/login': {
            fs.readFile('./pages/login.html', 'utf8', (err, data) => {
                res.write(data1);
                res.write(data);
                res.end();
            })
            break;
        }
        case '/register': {
            fs.readFile('./pages/register.html', 'utf8', (err, data) => {
                res.write(data1);
                res.write(data);
                res.end();
            })
            break;
        }
        default: {
            res.write("<h1>404 Page Not Found</h1>");
            res.end();
            break;

        }

       
    }
})

server.listen(8989)
// Run the serverTwo.js file using the command node serverTwo.js