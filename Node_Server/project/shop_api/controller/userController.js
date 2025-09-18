import userSchemaModel from '../model/userModel.js';
import '../connection/dbConfig.js';
import rs from 'randomstring';
import sendMessageOnMail from './emailcontroller.js';
import session from 'express-session';
import jwtAuth from '../auth_token/jwtAuth.js';
import APIResponse from '../response/APIResponse.js';

export var saveUser = async (req, res, next) => {

  // Data Get from Request Object 
  var userDetails = req.body;

  // All Data Get From Collection 
  const userListData = await userSchemaModel.find();

  // Find length;
  var len = userListData.length;
  console.log("User List Length : " + len);

  var _id = (len == 0) ? 1 : userListData[len - 1]._id + 1
  console.log("Id is : " + _id);

  userDetails = { ...userDetails, "_id": _id, "role": "user", "info": new Date(), "status": 0 };
  console.log("User Object Is : " + JSON.stringify(userDetails));

  try {
    var resp = await userSchemaModel.create(userDetails);

    // create random string :
    var otp = rs.generate({
      length: 6,
      charset: 'numeric'
    });
    console.log("My Mail is : ", resp.email);
    console.log("Generated OTP: " + otp);

    // OTP send on mail 
    sendMessageOnMail(resp.email, otp);

    // data save in session
    req.session.user_otp = otp;
    req.session.save();

    // res.status(200).json({ "status": true, "message": "Data Inserted Successfully...", "user": resp, "otp": otp });
    res.status(200).json(new APIResponse(true,{user:resp , otp:otp },"Record Inserted Successfully..."))
  }
  catch (err) {
    // console.log("Exception is : " + err.message);
    // res.status(500).json({ "status": false, "message": "Record Not Inserted", "error": err.message });
    res.status(200).json(new APIResponse(false,{error:err},"Record Not Inserted..."))

  }
};

export var loginUser = async (req, res, next) => {
  var userDetails = req.body;
  var email = userDetails.email;
  var password = userDetails.password;
  try {
    var userData = await userSchemaModel.findOne({ email:email , password:password });
    if (userData != null) {

      //Token Genrate and Associate with mail
      // var key = rs.generate();
      // var payload = { "subject": userList[0].email };
      // var user_token = jwt.sign(payload, key)

      var user_token = jwtAuth.generateToken(userData._id)
      console.log("Token is :"+user_token);
      console.log("Login Success...");
      
      // res.status(200).json({ status: true, "message": "Login Success", user: userList[0], "token": user_token });
      res.status(200).json(new APIResponse(true,{user : userData , token : user_token},"Login Success"))

    }
    else {
      console.log("Login Failed ....");
      // res.status(200).json({ status: false, "message": "Login Failed", user: userList[0] });
      res.status(200).json(new APIResponse(false,{user:null },"Login Failed"))

    }
  }
  catch (err) {
    console.log("Login Exception is : " + err);
  }
}
export var viewAllUser = async (req, res, next) => {
  // var userDetails = req.body;
  try {
    var userList = await userSchemaModel.find({
      _id:{$ne : req.user}}).select('-password'); //Here req.user jo hum tokenAunthentic se return karwa rahe hai
    
    // console.log("all"+JSON.stringify(userDetails));

    var len = userList.length;

    if (len != 0) {
      // res.status(200).json({ status: true, "message": "Data found ", user: userList });
      res.status(200).json(new APIResponse(true,{ users : userList },"Record Found"))

    }
    else {
      // res.status(200).json({ status: false, "message": "Data Not found ", user: userList });
      res.status(200).json(new APIResponse(false,{users : userList},"Record Not Found"))

    }
  }
  catch (err) {
    console.log("Data found Exception is : " + err);
  }
}
export var deleteUser = () => {

}
export var updateUser = async (req, res, next) => {

}

export var OTPVerification = (req, res, next) => {

  // Data Get from session 
  const user_data = req.session.user_otp;
  console.log("Session User Data Is : " + user_data);

  // Get Data From Request Object 
  var user_details = req.body;
  console.log("OTP Verification Is : " + user_details.otp);

  if (user_data == user_details.otp) {
    res.status(200).json({ "status": true, "Message": "OTP Verified OR Matched..." });
    req.session.destroy(function (err) {
      if (err) {
        console.log("Session Destroy ....")
      }
    })
  }
  else {
    res.status(200).json({ "status": false, "Message": "OTP Not Verified..." });
  }
}

export var changePassword = async (req, res, next) => {
  try{
    const request_details = req.body;
    var old_password = request_details.old_password;
    var new_password = request_details.new_password;
    console.log(old_password +":"+new_password);

    var user_obj = await userSchemaModel.findOne({_id : req.user })
    console.log("Object is : "+JSON.stringify(user_obj));

    if(user_obj == null){
      res.json(new APIResponse(false , null ,"User Not Found!"))
    }
    else{
      console.log("Pass is :" + user_obj.password);
      if(user_obj.password == old_password){
        user_obj = await userSchemaModel.findOneAndUpdate(
            {_id : req.user }, //Find the user by their is
            {password : new_password}, // Update  the password field with the new hashed password
            {new : true} //Return the upadate user document
        )        
        res.json(new APIResponse(true , user_obj , "User Password Changed !"))
      }
      else{
        res.json(new APIResponse(false , null , "Password Not mAtch ! : "))

      }
    }
  }
  catch(err){
    console.log("Error : "+JSON.stringify(err));
    res.json(new APIResponse(false , err , "User Password Changed Failed! "))
  }
}

export const loginUserInfo = async (req,res)=>{
  const obj = await userSchemaModel.findOne({_id : req.user},{password:0});

  res.status(200).json(new APIResponse(true,{userProfile:obj },"User Details Found"))

}

export const viewSpecificUserInfo = async(req,res,next) =>{
  try{
    //Get user id from the route parameret
    const id = req.params.id;

    //Find the user nu ID and omit the  password field
    const user = await userSchemaModel.findOne({_id : id},{password:0})

    //check if user exists
    if(!user){
      return res.status(404).json(new APIResponse(false , null ,"User Not Found!"))
    }
    //return user data as a successful response
    res.json(new APIResponse(true , user , "User data found !"))

  }
  catch(err){
    console.log("Error : "+JSON.stringify(err));
    res.json(new APIResponse(false , err , "User data found Failed! "))
  }
}