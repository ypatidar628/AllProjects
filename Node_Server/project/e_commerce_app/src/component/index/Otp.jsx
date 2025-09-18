import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";


function Otp() {
    const otp = useRef();
    const nevigate = useNavigate()
    
    const navigate = useNavigate()

   
    const otpMatch = async(event) =>{
        event.preventDefault()
        var obj = {
            user_otp: otp.current.value
        }
        console.log("Obj is :"+JSON.stringify(obj));
        
        try{
            const resp = await WebService.postAPICall(WebAPI.otpMatch, obj)
            console.log("Register Response is : "+resp);
            console.log("Register Response is : "+JSON.stringify(resp));
            if(resp.data.status == true){
                nevigate("/login")
            }
            
            
        }
        catch(err){
            console.log("Error is :"+err);
            
        }
        clearFeilds()
    }

    const clearFeilds = () => {
            
            otp.current.value = ""
    }

    return (
        <div className="log-container2">
            <div className="register-container2">
                <div className="row text-center">
                    <h2 className="register-title2">
                        Verify Register<FontAwesomeIcon icon={faRightToBracket} />
                    </h2>
                </div>
                <form
                    onSubmit={(event) => {
                        otpMatch(event);
                    }}
                >
                    <div className="form-group2">
                        <label htmlFor="email" className="label2">Email Address :</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            className="input2"
                            placeholder="Enter your OTP"
                            ref={otp}
                            required
                            aria-describedby="otpError"
                        />
                        <div className="error2" id="otpError">Please enter a valid OTP </div>
                    </div>
                                        <button type="submit" className="button2">
                        <FontAwesomeIcon icon={faRightToBracket} /> Verify OTP
                    </button>

                    <br />
                </form>
            </div>
        </div>
    );
}

export default Otp;
