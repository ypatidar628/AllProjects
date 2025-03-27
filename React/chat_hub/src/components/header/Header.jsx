import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkStatus } from "../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Header() {
  var mainStatus = useSelector((state) => state.userData.value);
  console.log("main status " + mainStatus.isLoginStatus);
  
  var dispatch = useDispatch();
  const logoRef = useRef(null);

  useEffect(() => {
    if (mainStatus) {
      toast.success("Success");
    }

    gsap.from(logoRef.current, {
      duration: 1,
      y: -20,
      opacity: 0,
      ease: "power3.out",
    });
  }, [mainStatus]);

  var logoutUser = (event) => {
    event.preventDefault();
    console.log("Before Logout: " + mainStatus.isloginStatus);
  
    if (mainStatus.isloginStatus) {
      dispatch(checkStatus(mainStatus. isloginStatus = false )); // Correct way to update
      console.log("After Logout: " + mainStatus.isloginStatus);
    } else {
      dispatch(checkStatus({ ...mainStatus, isloginStatus: true }));
      console.log("After Login: " + mainStatus.isloginStatus);
    }
  };
  
  return (
    <div className="bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div ref={logoRef} className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold">
            {/* Logo */}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ..."
              className="bg-gray-700 text-white rounded-lg px-3 py-1 focus:outline-none"
            />
          </div>
          <div className="relative">
            <Link to="/myProfile" className="flex items-center text-white">
              <img
                src={mainStatus.image}
                alt="profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="hidden sm:block">Hi, {mainStatus.name}</span>
            </Link>
          </div>
          <button
            onClick={(event) => logoutUser(event)}
            className="text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Header;
