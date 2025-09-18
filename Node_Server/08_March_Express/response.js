import express from "express";
import bodyParser from "body-parser";

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post("/register",(req,res)=>{

    const userData = req.body;

    console.log(`User Details is : ${userData}`);
    console.log(`User Details is : ${JSON.stringify(userData)}`);

    console.log(`Id is ${userData.id}`);
    console.log(`Name is ${userData.name}`);
    console.log(`Mobile is ${userData.mobile}`);
    console.log(`Salary is ${userData.sal}`);


    res.status(200).json({"status":true,"message":"Fetch data successfully"})
    
    
})


app.listen(8989,()=>{
    console.log(`Server Invoked...`);
    
})
/**
 * {"id":102,"name":"Yogendra Patidar","mobile":"1234567890","sal":123456}
 */