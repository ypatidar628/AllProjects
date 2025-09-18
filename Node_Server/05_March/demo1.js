import fs from 'fs';

fs.readFile('./m1.txt','utf-8', (err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result)
    }
});
