import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";


function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const contact = useRef();
    const gender = useRef();
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const saveUser = async(event) =>{
        event.preventDefault()
        var obj = {
            name: name.current.value,
            contact: contact.current.value,
            email: email.current.value,
            password: password.current.value,
            gender: gender.current.value,
        }
        console.log("Obj is :"+JSON.stringify(obj));
        
        try{
            const resp = await WebService.postAPICall(WebAPI.saveUser , obj)
            console.log("Register Response is : "+resp);
            console.log("Register Response is : "+JSON.stringify(resp));
            if(resp.data.status == true){
                navigate('/otpMatch')
            }
            
        }
        catch(err){
            console.log("Error is :"+err);
            
        }
        clearFeilds()
    }

    const clearFeilds = () => {
            name.current.value = "",
            contact.current.value = "",
            email.current.value = "",
            password.current.value = "",
            gender.current.value = ""
    }

    return (
        <div className="log-container2" >
            <div className="register-container2">
                <div className="row text-center">
                    <h2 className="register-title2">
                        Register Here <FontAwesomeIcon icon={faRightToBracket} />
                    </h2>
                </div>
                <form
                    onSubmit={(event) => {
                        saveUser(event);
                    }}
                >
                    <div className="form-group2">
                        <label htmlFor="name" className="label2">Enter Name :</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="input2"
                            placeholder="Enter your name"
                            ref={name}
                            required
                            aria-describedby="nameError"
                        />
                        <div className="error2" id="nameError">Please enter a valid name</div>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="email" className="label2">Email Address :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="input2"
                            placeholder="Enter your email"
                            ref={email}
                            required
                            aria-describedby="emailError"
                        />
                        <div className="error2" id="emailError">Please enter a valid email address</div>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="password" className="label2">Password :</label>
                        <div className="input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="input2"
                                placeholder="Enter your password"
                                ref={password}
                                required
                                aria-describedby="passwordError"
                            />
                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={togglePasswordVisibility}
                                aria-label="Toggle password visibility"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div className="error2" id="passwordError">Password must be at least 6 characters</div>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="contact" className="label2">contact :</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="input2"
                            placeholder="Enter your contact number"
                            ref={contact}
                            required
                            aria-describedby="phoneError"
                        />
                        <div className="error2" id="phoneError">Please enter a valid phone number</div>
                    </div>
                    <div className="row form-group2">
                    <label htmlFor="gender" className="label2">Gender :</label>
                        <select className="form-control select2" ref={gender}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button type="submit" className="button2">
                        <FontAwesomeIcon icon={faRightToBracket} /> Sign In
                    </button>

                    <br />
                    <br />
                    <span style={{ color: "white" }}>
                        If You Have Already Registered? <Link to="/login" className="register2">Click Here!</Link>
                    </span>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default Register;
