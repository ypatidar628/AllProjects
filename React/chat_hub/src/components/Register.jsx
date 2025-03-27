import { useRef, useState, useEffect } from "react";
import WebService from "./service/WebService";
import WebAPI from "./service/WebAPI";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import gsap from "gsap";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [msg, setMessage] = useState("");
  const [validMsg, setValidationMessage] = useState("");

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();
  const gender = useRef();
  const registerContainerRef = useRef(null);

  // Fade-in animation on component load
  useEffect(() => {
    gsap.from(registerContainerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  const registerUser = async (event) => {
    event.preventDefault();
    const nm = name.current.value;
    const em = email.current.value;
    const pass = password.current.value;
    const mob = phone.current.value;
    const gen = gender.current.value;

    const obj = {
      name: nm,
      phone: mob,
      email: em,
      password: pass,
      gender: gen,
    };

    const resp = await WebService.postAPICall(WebAPI.registerAPI, obj);

    if (resp.data.status) {
      toast.success("🎉 Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage(resp.data.message);
      setValidationMessage(resp.data.data[0]?.message || "");
      gsap.fromTo(
        registerContainerRef.current,
        { x: -10 },
        { x: 10, repeat: 5, duration: 0.1, yoyo: true }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-600">
      <div
        ref={registerContainerRef}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg transform transition duration-300"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 Register Here!
        </h1>

        <form onSubmit={registerUser} className="space-y-5">
          <div className="flex flex-col">
            <input
              type="text"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User Name"
              ref={name}
              required
            />
          </div>

          <div className="flex flex-col">
            <input
              type="email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User Email"
              ref={email}
              required
            />
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User Password"
              ref={password}
              required
            />
          </div>

          <div className="flex flex-col">
            <input
              type="tel"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User Phone"
              ref={phone}
              required
            />
          </div>

          <div className="flex flex-col">
            <select
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            🚀 Register
          </button>
        </form>

        {msg && (
          <div className="mt-4 text-red-500 text-center font-medium">
            {msg} {validMsg}
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
