import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import "./UserDetail.css";

const UserDetail = ({ receiver, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!receiver) return;

    // ✅ Fetch user details from backend
    axios.get(`${API_BASE_URL}/api/auth/user/${receiver._id}`)
      .then((res) => setUserDetails(res.data))
      .catch((err) => console.error("❌ Error fetching user details:", err));
  }, [receiver]);

  if (!userDetails) return <p>Loading user details...</p>;

  return (
    <div className="user-detail">
      <button className="close-button" onClick={onClose}>✖</button>
      <h3>{userDetails.name}</h3>
      <p>{userDetails.email}</p>
      <p>{userDetails.mobile}</p>
    </div>
  );
};

export default UserDetail;
