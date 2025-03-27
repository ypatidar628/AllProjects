import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI"
import "../user/ChangePass.css"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { checkStatus } from "../redux/userSlice";

function ForgetPass()
{
    const userData = useSelector(state=>state.userData.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();
   
    var old_password = useRef();
   var new_password = useRef();
 
   var info;
  //  useEffect=()=>{
  //   info();
  //  }
   var changePassword = async (event)=>{
     event.preventDefault();
 
     var old_pass = old_password.current.value;
     var new_pass = new_password.current.value;
     var obj = {old_password :old_pass ,new_password :new_pass}

    //  var response = await WebService.postAPICall(WebAPI.loginAPI,obj);

 
     var resp = await WebService.putAPICall(WebAPI.changePassword,obj,userData.token)
     console.log("Pass Resp is : "+resp);
     console.log("String Pass Resp is : "+JSON.stringify(resp)); 
     if(resp.data.status)
         {
           toast.success(" password change Success")

           setInterval(() => {
             info ={...resp.data.data,isLoginStatus:false}
            dispatch(checkStatus(info))
            navigate("/")
            
          }, 2000);
         }  
 }
 
    return<div className="main-container">
    <div className="login-container">
    <div className="row text-center ">
        <h1 className="login-title">Change Password Here !</h1>
    </div>
    <form  onSubmit={(event)=>
                {
                    changePassword(event);
                }
            } >
        <div className="form-group">
            <label htmlFor="email" className="label">Enter Old Password</label>
            <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input type="text" id="email" name="email" className="input" placeholder="Enter Old Password" ref={old_password} required/>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="password" className="label">Enter New Password</label>
            <div className="input-group">
                <i className="fas fa-lock"></i>
                <input type="text" id="password" className="input" name="password" placeholder="Enter New Password"  ref={new_password} required />
            </div>
        </div>
        <div className="row form-group ">
     <input type="submit" className="form-control button" value="Change Password"/>
   </div>
    </form>
   
    </div>
  
<ToastContainer/>
</div>
}
export default ForgetPass;