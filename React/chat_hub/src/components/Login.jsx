import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WebService from "./service/WebService";
import WebAPI from "./service/WebAPI";
import { useDispatch, useSelector } from "react-redux";
import { checkStatus } from "./redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import gsap from "gsap";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [msg, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();
  const loginContainerRef = useRef(null);

  useEffect(() => {
    gsap.from(loginContainerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  const loginUser = async (event) => {
    event.preventDefault();
    const em = email.current.value;
    const pass = password.current.value;
    const obj = { email: em, password: pass };

    const response = await WebService.postAPICall(WebAPI.loginAPI, obj);

    if (response.data.status) {
      const info = { ...response.data.data, isLoginStatus: true };
      dispatch(checkStatus(info));
      navigate("/userHome01");
      setMessage(response.data.message);
    } else {
      toast.error("Invalid login! ❌");
      gsap.fromTo(
        loginContainerRef.current,
        { x: -10 },
        { x: 10, repeat: 5, duration: 0.1, yoyo: true }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div
        ref={loginContainerRef}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition duration-300"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🔐 Login Here!
        </h1>

        <form onSubmit={(event) => loginUser(event)} className="space-y-5">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 font-semibold mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              ref={email}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              ref={password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            🚀 Sign In
          </button>
        </form>

        {msg && (
          <div className="mt-4 text-red-500 text-center font-medium">
            {msg}
          </div>
        )}

        <div className="text-center mt-4">
          <span className="text-gray-600">
            If You Haven't Registered?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-semibold"
            >
              Click Here!
            </Link>
          </span>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
