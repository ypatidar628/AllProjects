import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { useDispatch } from "react-redux";
import { changeUserInfo } from "../redux/userSlice";
import gsap from "gsap";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    let email = useRef();
    let password = useRef();
    const formRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    useEffect(() => {
        gsap.from(formRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
        });
    }, []);

    const loginUser = async (event) => {
        event.preventDefault();
        var obj = {
            email: email.current.value,
            password: password.current.value,
        };

        try {
            const resp = await WebService.postAPICall(WebAPI.loginUser, obj);
            if (resp.data.status === true) {
                var rol = resp.data.data.user.role;
                var obj = { isLoginStatus: true, role: rol, user: resp.data.data.user, token: resp.data.data.token };
                dispatch(changeUserInfo(obj));
                navigate("/");
            }
        } catch (err) {
            console.log("Error is :" + err);
        }
    };

    return (
        <div className="bg-green-200 min-h-screen flex items-center justify-center">
            <div
                ref={formRef}
                className="bg-[#3B5D50] bg-opacity-90 shadow-lg rounded-2xl p-8 max-w-2xl w-full backdrop-blur-md"
            >
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2"><span>Login Here <FontAwesomeIcon icon={faRightToBracket} className="text-4xl relative bottom-1.5"/></span></h1>
                </div>
                <form
                    onSubmit={(event) => {
                        loginUser(event);
                    }}
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-300">
                            Email Address
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                placeholder="Enter your email"
                                ref={email}
                                required
                            />
                            <FontAwesomeIcon icon={faEnvelope} className="absolute right-4 top-4 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-300">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                placeholder="Enter your password"
                                ref={password}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-3 rounded-lg hover:from-teal-500 hover:to-green-400 transform hover:scale-105 transition-transform"
                    >
                        <FontAwesomeIcon icon={faRightToBracket} className="mr-2" /> Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-white">
                       <span> If You Have Not Registered? {" "}</span>
                        <Link to="/register" className="font-bold">
                            Click Here!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
