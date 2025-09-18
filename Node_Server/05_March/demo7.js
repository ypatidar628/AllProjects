import path from 'path';
// var myPath  ="D:\Downloads\blue_bg.jpg";

var path1  ="D:";
var path2 = "Downloads"
var path3 = "blue_bg.jpg";


var myPath = path1+path2+path3

console.log(myPath);

myPath = path.join(path1,path2,path3);
console.log(myPath);

