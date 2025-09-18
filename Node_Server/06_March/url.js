import url from "url";

// var urlData ="http://www.example.com/profile"
// var urlData ="http://localhost:3000/admin/profile"
var urlData ="http://localhost:3000/admin/profile.js?id=1&name=abc&age=25"  




console.log(urlData);
// console.log(url);

const res = url.parse(urlData,true);
console.log(res);

console.log(res.protocol);
console.log(res.host);
console.log(res.path);
console.log(res.port);
console.log(res.query);



console.log(res.query.id,":",res.query.name,":",res.query.age);


