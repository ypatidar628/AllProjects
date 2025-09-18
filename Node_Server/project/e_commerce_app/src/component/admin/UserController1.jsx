import { useEffect, useState } from "react";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "../css/UserController1.css";

const UserController1 = () => {
  const userData = useSelector((state) => state.userData.value);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const resp = await WebService.getAPICall(
        WebAPI.viewAllUser,
        userData.token
      );
      if (resp.data.status === true) {
        // console.log("All users fetched successfully:", resp.data.data.users);
        toast.success("All users fetched successfully!");
        setAllUsers(resp.data.data.users);
      }
    } catch (err) {
      console.error("Error while fetching all users:", err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <h2>All Users Details & Manage Users</h2>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>User Role</th>
            <th>User Email</th>
            <th>User Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td className="capitalize">{user.name}</td>
              <td className="capitalize">{user.role}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer
        position="bottom-right"
        autoClose={1000} // Auto close after 3 sec
        hideProgressBar={false}
        newestOnTop={true} // Newest toast will show on top
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={2}
        transition={Flip}
      />
    </div>
  );
};

export default UserController1;
