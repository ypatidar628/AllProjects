import fs from 'fs';
var data ="Yogendra" 
fs.writeFileSync('./m2.txt',data, (err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result)
    }
});
