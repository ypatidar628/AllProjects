import express from 'express';
import bodyParser from 'body-parser';
import './connection.js'
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs")

//Create entites or feilds
const userSchema = mongoose.Schema({
    _id: Number,
    name: { type: String },
    email: { type: String },
    password: { type: String },
    contact: { type: String },
    gender: { type: String }
})

//Create Collections
var userSchemaModel = mongoose.model('user', userSchema);

// app.get("/", async (req , res)=>{

//     var user_id = 2;
//     var user_name = "Nilesh";
//     var user_email = "nilesh@gmail.com";
//     var user_password = "12345";
//     var user_contact = "1234467890";
//     var user_gender = "male";

//     var obj = { _id:user_id , name:user_name , email:user_email , password:user_password , contact:user_contact , gender:user_gender};

//     try{
//         var resp = await userSchemaModel.create(obj);
//         console.log("response is : "+JSON.stringify(resp));

//     }
//     catch(err){
//         console.log("Error is : " + JSON.stringify(err));
//     }
// })

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.post("/registerUser", async (req, res) => {

    const userData = req.body;

    var user_id = userData.id;
    var user_name = userData.name;
    var user_email = userData.email;
    var user_password = userData.password;
    var user_contact = userData.contact;
    var user_gender = userData.gender;

    var obj = { _id: user_id, name: user_name, email: user_email, password: user_password, contact: user_contact, gender: user_gender };

    try {
        var resp = await userSchemaModel.create(obj);
        console.log("response is : " + JSON.stringify(resp));
        res.status(200).json({ 'status': true, 'message': "Data Insert Successfully...", 'userData': resp })

    }
    catch (err) {
        console.log("Error is : " + JSON.stringify(err));
    }
})

// app.post('/login', async (req, res) => {
//     var userDetails = req.body;
//     console.log("Received user details: ", userDetails);

//     try {

//         var user = await userSchemaModel.find(userDetails);

//         if (user) {
//             console.log("User found: ", user);
//             var nm = user[0].name;
//             res.render('userHome', { name: nm })
//             // res.status(200).json({ status: true, user: user });
//         } else {
//             console.log("Invalid email or password.");
//             res.status(200).json({ status: false, message: "Invalid email or password" });
//         }
//     } catch (err) {
//         console.error("Error occurred: ", err);
//         res.status(500).json({ status: false, message: "Internal Server Error" });
//     }
// });

app.post('/login', async (req, res) => {
    var userData = req.body;
    var user_email = userData.email;
    var user_password = userData.password;

    var obj = { email: user_email, password: user_password }
    try {

        var resp = await userSchemaModel.find(obj);

        console.log("User found: ", resp);

        if (resp.length != 0)
       {
            var nm = resp[0].name;
            res.render("userHome", { name:nm })
            // res.status(200).json({ status: true, resp: resp });
        } 
    } 
catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});



app.listen(8989, () => {
    console.log("Server Invoked : http://localhost:8989/");

})