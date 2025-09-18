import express from "express"
import connection from "../connection/dbconfig.js";
const route = express.Router();

route.get("/",(req,res)=>{
  // res.send("Home or Index URL Invoked")
  res.render('home',{name:'Nilesh'});
})
route.get("/about",(req,res)=>{
  // res.send("About URL Invoked")
  res.render('about',{id:101,name:'Nilesh'})
})
route.get("/contact",(req,res)=>{
  // res.send("Contact URL Invoked")
  res.render('contact',{arr:[11,22,33,44,55,66,77,88]})
})
route.get("/login",(req,res)=>{
  // res.send("Login URL Invoked")
  res.render('login')
})
route.get("/register",(req,res)=>{
  // res.send("Register URL Invoked")
  res.render('register')
})

route.post("/saveUser",(req,res)=>{
// Get data Object from request object
var obj = req.body;

console.log("Name is : "+obj.name);
console.log("Email is : "+obj.email);
console.log("Password is : "+obj.password);
console.log("Mobile is : "+obj.contact);

//Get All Data From Object 
var name = obj.name;
var email = obj.email;
var password = obj.password;
var contact = obj.mobile;

//Data Send on dataBase or table
connection.getConnection((err,con)=>{
  if(!err)
  {
    //Write Insert Query
    var sql = "insert into userdata(name,email,password,contact) values(?,?,?,?)";
    //data insert

    con.query(sql,[name,email,password,contact],(er,result)=>{
      if(!er)
      {
            console.log("Data Insert ...");
            res.end("Success...")                
      }
      else
      {
         console.log("Er : "+er);
         console.log("Er : "+JSON.stringify(er));
         res.end("failed...")
      }
  })
  }

  else
  {
    console.log("Error is : "+err);
    console.log("Error is : "+JSON.stringify(err));
  }
})
})

route.post("/loginUser",(req,res)=>{
  var userData = req.body;
  var email = userData.email;
  var password = userData.password;

  console.log(email+" : "+password);
  connection.getConnection((error,con)=>{
    if(!error)
    {
      var sql = "select * from userdata where email = ? and password = ?";
      con.query(sql,[email,password],(err,result)=>{
        if(!err)
        {
          console.log("User Result is : "+result);
          console.log("User Result is : "+JSON.stringify(result));
          res.send("login Success...")
        }
        else
        {
          console.log("User Error is : "+err);
          console.log("User Error is : "+JSON.stringify(err));
        }
      })
    }
    else
    {
      console.log("Login User Error : "+error);
      console.log("Login User Error : "+JSON.stringify(error));
    }
  })
  
})
export default route;