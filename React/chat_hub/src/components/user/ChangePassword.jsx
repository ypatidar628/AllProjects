import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkStatus } from "../redux/userSlice";
import { gsap } from "gsap";

function ChangePassword() {
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const old_password = useRef();
  const new_password = useRef();
  const formRef = useRef(null);

  useEffect(() => {
    // GSAP animation on page load
    gsap.from(".form-container", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  const changePassword = async (event) => {
    event.preventDefault();

    const old_pass = old_password.current.value;
    const new_pass = new_password.current.value;
    const obj = { old_password: old_pass, new_password: new_pass };

    const resp = await WebService.putAPICall(WebAPI.changePassword, obj, userData.token);

    if (resp.data.status) {
      toast.success("Password changed successfully!");

      setTimeout(() => {
        const info = { ...resp.data.data, isLoginStatus: false };
        dispatch(checkStatus(info));
        navigate("/");
      }, 2000);
    } else {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div
        ref={formRef}
        className="form-container bg-white border border-gray-300 shadow-lg rounded-2xl w-full max-w-md p-8 transform transition-all duration-300"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          🔐 Change Password
        </h1>

        <form
          onSubmit={(event) => {
            changePassword(event);
          }}
          className="space-y-6"
        >
          {/* Old Password */}
          <div className="form-group">
            <label
              htmlFor="old_password"
              className="block text-sm font-semibold text-gray-600"
            >
              Enter Old Password
            </label>
            <div className="relative mt-2">
              <input
                type="password"
                id="old_password"
                name="old_password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter Old Password"
                ref={old_password}
                required
              />
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label
              htmlFor="new_password"
              className="block text-sm font-semibold text-gray-600"
            >
              Enter New Password
            </label>
            <div className="relative mt-2">
              <input
                type="password"
                id="new_password"
                name="new_password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter New Password"
                ref={new_password}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 duration-300"
            >
              🚀 Change Password
            </button>
          </div>
        </form>

        {/* Toast Notifications */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
}

export default ChangePassword;
