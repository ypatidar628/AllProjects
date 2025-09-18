import express, { json } from 'express';
const route = express.Router();
import connection from '../connection/dbconfig.js';

route.get("/",(req,res)=>{
    // res.send("Index Home Invoked....");
    res.render("home",{name:"Yogendra"})
})
route.get("/about",(req,res)=>{
    // res.send("Index About Invoked....");
    res.render("about",{id:101 , name:"Nilesh"})
})
route.get("/contact",(req,res)=>{
    // res.send("Index Contact Invoked....");
    res.render("contact",{arr:[11,12,13,14,15,16,17,18,19,20]})
})
route.get("/login",(req,res)=>{
    // res.send("Index Login Invoked....");
    res.render("login")
})
route.get("/register",(req,res)=>{
    // res.send("Index Register Invoked....");
    res.render("register")
})

route.post("/registerUser",(req,res)=>{
    var obj = req.body;
    var name = obj.name;
    var email = obj.email;
    var password = obj.password;
    var contact = obj.contact;

    console.log("Name is :"+obj.name);
    console.log("Contact is :"+obj.contact);
    console.log("Emial is :"+obj.email);
    console.log("Password is :"+obj.password);

    connection.getConnection((err,con)=>{
        if(!err){
            //Write  Insert Query
            var sql = "insert into userdata(name,email,password,contact) values(?,?,?,?)"

            //data Insert
            con.query(sql,[name,email,password,contact],(er,result)=>{

                if(!er){
                    console.log("Data Insert...");
                    res.end("Success...")
                    
                }
                else{
                    console.log("Er : "+er);
                    console.log("Er : "+JSON.stringify(er));
                    res.end("Failed....")
                }
            })
        }
        else{
            console.log("Err is :"+err);
            console.log("Err is :"+JSON.stringify(err));
        }
    })

    
})

export default route;

