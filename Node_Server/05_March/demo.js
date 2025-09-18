import fs from 'fs';

const data = fs.readFileSync('package.json');
console.log(typeof data);
console.log(data);


const data1 = fs.readFileSync('package.json', 'utf8');
console.log(typeof data1);
console.log(data1);