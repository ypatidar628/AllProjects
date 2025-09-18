import express from "express";
import url from "url";

const app = express()

app.get("/register",(req,res)=>{

    const myUrl = req.url;
    console.log(`Url is ${myUrl}`);
    
    const userData = url.parse(myUrl,true).query;

    console.log(`Parse URL is : ${JSON.stringify(userData)}`);

    console.log(`Id is ${userData.id}`);
    console.log(`Name is ${userData.name}`);
    console.log(`Mobile is ${userData.mobile}`);


   res.send(`Id is ${userData.id} : Name is ${userData.name} : Mobile is ${userData.mobile}`);
    
    
})


app.listen(8989,()=>{
    console.log(`Server Invoked...`);
    
})

/**
 * http://localhost:8989/register?id=101&name='Yogendra Patidar'&mobile='1234567890'
 */