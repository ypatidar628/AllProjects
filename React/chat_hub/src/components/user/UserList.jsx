import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import gsap from "gsap";

function UserList() {
  const userData = useSelector((state) => state.userData.value);
  const [userList, setUserList] = useState([]);
  const tableRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    loadAllUserData();

    // GSAP animations
    gsap.from(headerRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(tableRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });
  }, []);

  const loadAllUserData = async () => {
    const resp = await WebService.getAPICall(WebAPI.allUserListAPI, userData.token);
    console.log("User List:", resp);
    if (resp.data.status) {
      setUserList(resp.data.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div
        ref={headerRef}
        className="w-full max-w-9xl bg-white shadow-lg rounded-2xl p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-blue-600">📚 User Data List</h3>
          <nav className="flex items-center space-x-3">
            <Link to="#" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="#" className="text-blue-500 hover:text-blue-700">
              List
            </Link>
          </nav>
        </div>

        <div ref={tableRef} className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Request</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={user.image}
                      alt="User"
                      className="h-20 w-20 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">{user.gender}</td>
                  <td className="border px-4 py-2 text-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                      Send Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;
