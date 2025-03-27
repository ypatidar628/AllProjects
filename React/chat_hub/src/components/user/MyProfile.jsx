import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WebService from "../service/WebService";
import WebAPI from "../service/WebAPI";
import "../../components/user/MyProfile.css";

function MyProfile() {
  const userData = useSelector((state) => state.userData.value);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const resp = await WebService.getAPICall(WebAPI.myProfileAPI, userData.token);
    if (resp.data.status) {
      setProfileData(resp.data.data);
    } else {
      console.error("Failed to load profile data");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h3 className="profile-title">My Profile</h3>

        <div className="profile-content">
          {/* Profile Image */}
          <img
            src={profileData.profilePic || "/images/default-avatar.png"}
            alt="Profile"
            className="profile-image"
          />

          {/* Profile Details */}
          <div className="profile-details">
            <div className="profile-item">
              <strong>Name:</strong> {profileData.name || "N/A"}
            </div>
            <div className="profile-item">
              <strong>Email:</strong> {profileData.email || "N/A"}
            </div>
            <div className="profile-item">
              <strong>Phone:</strong> {profileData.phone || "N/A"}
            </div>
            <div className="profile-item">
              <strong>Joined On:</strong>{" "}
              {profileData.createdAt
                ? new Date(profileData.createdAt).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Buttons */}
            <div className="profile-buttons">
              <button
                className="edit-btn"
                onClick={() => console.log("Edit Profile Clicked")}
              >
                Edit Profile
              </button>
              <button
                className="logout-btn"
                onClick={() => console.log("Logout Clicked")}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
