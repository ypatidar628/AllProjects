import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import registerBg from "../img/about/loginRegisterBg2.jpg";
import gsap from "gsap";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const contact = useRef();
  const gender = useRef();
  const navigate = useNavigate();
  const formRefRegister = useRef(null);

  // GSAP Animation for form
  useEffect(() => {
    gsap.from(formRefRegister.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const saveUser = async (event) => {
    event.preventDefault();

    const obj = {
      name: name.current.value,
      contact: contact.current.value,
      email: email.current.value,
      password: password.current.value,
      gender: gender.current.value,
    };

    try {
      const resp = await WebService.postAPICall(WebAPI.saveUser, obj);
      if (resp.data.status === true) navigate("/otpMatch");
    } catch (err) {
      console.log("Error:", err);
    }

    clearFields();
  };

  const clearFields = () => {
    name.current.value = "";
    contact.current.value = "";
    email.current.value = "";
    password.current.value = "";
    gender.current.value = "";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-8"
      style={{ backgroundImage: `url(${registerBg})` }}
    >
      <div
        ref={formRefRegister}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl mb-36 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10"
      >
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Register Here{" "}
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="text-green-600 text-2xl sm:text-3xl ml-1"
          />
        </h2>

        {/* Form */}
        <form onSubmit={saveUser} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Enter Name :
            </label>
            <input
              type="text"
              id="name"
              ref={name}
              required
              placeholder="Enter your name"
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address :
            </label>
            <input
              type="email"
              id="email"
              ref={email}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password :
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={password}
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
              Contact :
            </label>
            <input
              type="text"
              id="phone"
              ref={contact}
              required
              placeholder="Enter your contact number"
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-1">
              Gender :
            </label>
            <select
              id="gender"
              ref={gender}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 sm:py-4 rounded-lg font-bold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-600 hover:to-green-600 transform hover:scale-[1.02] transition-all duration-300 shadow-md"
          >
            <FontAwesomeIcon icon={faRightToBracket} /> Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-700 text-sm md:text-base">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
