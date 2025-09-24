import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { useDispatch } from "react-redux";
import { changeUserInfo } from "../redux/userSlice";
import gsap from "gsap";
import loginBg from '../../component/img/about/loginRegisterBg2.jpg';

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
    <div
      className="min-h-screen flex items-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div
        ref={formRef}
        className="bg-transparent shadow-xl rounded-2xl p-8 sm:p-10 max-w-lg w-full -mt-40 ml-90"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Login Here{" "}
            <FontAwesomeIcon
              icon={faRightToBracket}
              className="text-green-600 text-3xl sm:text-4xl ml-1"
            />
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={(event) => {
            loginUser(event);
          }}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
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
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute right-4 top-3.5 text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
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
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 rounded-lg shadow-md hover:from-teal-500 hover:to-green-500 transform hover:scale-105 transition duration-300"
          >
            <FontAwesomeIcon icon={faRightToBracket} className="mr-2" /> Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            If You Have Not Registered?{" "}
            <Link to="/register" className="font-semibold text-green-600 hover:underline">
              Click Here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
