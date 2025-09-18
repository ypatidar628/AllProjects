import fs from 'fs';
var data =" Patidar" 
fs.appendFile('./m2.txt',data, (err)=>{
    if(err){
        console.log(err);
    }
 
});
