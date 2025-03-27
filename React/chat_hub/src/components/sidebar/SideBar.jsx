import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { checkStatus } from "../redux/userSlice.jsx";
import gsap from "gsap";

function SideBar() {
  const dispatch = useDispatch();
  const mainStatus = useSelector((state) => state.userData.value);
  const sidebarRef = useRef(null);
  const linkRefs = useRef([]); // Store references to all links

  // GSAP animation for sidebar and links
  useEffect(() => {
    // Sidebar slide-in animation
    gsap.fromTo(
        sidebarRef.current,
        { x: -250, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    // Staggered animation for links
    gsap.fromTo(
        linkRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1, // Delay between each link animation
          ease: "power3.out",
          delay: 0.3, // Delay after sidebar opens
        }
    );
  }, []);

  var logoutUser = (event) => {
    event.preventDefault();
    console.log("H" + mainStatus);

    if (mainStatus.isloginStatus) {
      dispatch(checkStatus(mainStatus.isloginStatus(false)));
    } else {
      dispatch(checkStatus(true));
    }
  };

  return (
      <div
          ref={sidebarRef}
          className="w-[265px] h-screen bg-[#1E2939] text-white shadow-md  top-0 -left-160 lg:left-0 lg:fixed overflow-y-auto absolute "
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#1E2939]">
          <Link to="/" className="text-white text-2xl font-bold">
            Chat App
          </Link>
          <button className="text-white focus:outline-none">
            <i className="gg-menu-right"></i>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="mt-4">
          <ul className="space-y-1">
            {/* Add ref to each link */}
            <li ref={(el) => (linkRefs.current[0] = el)}>
              <Link
                  to="/userHome01"
                  className="flex items-center mb-3 px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-home mr-3"></i>
                <span className="text-sm text-slate-300">User Home</span>
              </Link>
            </li>

            <li ref={(el) => (linkRefs.current[1] = el)}>
              <Link
                  to="/userList"
                  className="flex items-center mb-3 px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-users mr-3"></i>
                <span className="text-sm text-slate-300">User List</span>
              </Link>
            </li>

            <li ref={(el) => (linkRefs.current[2] = el)}>
              <Link
                  to="/userPost"
                  className="flex items-center mb-3 px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-comment mr-3"></i>
                <span className="text-sm text-slate-300 ">User Post</span>
              </Link>
            </li>

            <li ref={(el) => (linkRefs.current[3] = el)}>
              <Link
                  to="/myPost"
                  className="flex items-center mb-3 px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-paper-plane mr-3"></i>
                <span className="text-sm text-slate-300">My Post</span>
              </Link>
            </li>

            <li ref={(el) => (linkRefs.current[4] = el)}>
              <Link
                  to="/myProfile"
                  className="flex items-center mb-3 px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-user-circle mr-3"></i>
                <span className="text-sm text-slate-300">My Profile</span>
              </Link>
            </li>

            <li ref={(el) => (linkRefs.current[5] = el)}>
              <Link
                  to="/changePassword"
                  className="flex items-center mb-3 px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-key mr-3"></i>
                <span className="text-sm text-slate-300">Change Password</span>
              </Link>
            </li>
            <li ref={(el) => (linkRefs.current[6] = el)}>
              <Link
                  to="/sendMessage"
                  className="flex items-center mb-3 px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-paper-plane mr-3"></i>
                <span className="text-sm text-slate-300">Send Message</span>
              </Link>
            </li>

            {/* Logout Button with stagger */}
            <li ref={(el) => (linkRefs.current[7] = el)}>
              <button
                  onClick={(event) => {
                    logoutUser(event);
                  }}
                  className="w-full flex items mb-3-center px-6 py-2 text-gray-300 hover:bg-red-600  rounded-lg transition-all duration-200"
              >
                <i className="fas text-slate-400 text-xl fa-sign-out-alt mr-3"></i>
                <span className="text-sm text-slate-300">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
  );
}

export default SideBar;
