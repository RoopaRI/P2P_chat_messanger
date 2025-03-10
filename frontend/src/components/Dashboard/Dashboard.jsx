import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";  
import socket from "../../socket";
import axios from "axios";
import API_BASE_URL from "../../config";
import { toast } from "react-toastify";
import UserList from "../UserList/UserList";
import MessageList from "../MessageList/MessageList";
import UserDetail from "../UserDetail/UserDetail";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = location.state?.currentUser;
  
  const [receiver, setReceiver] = useState(null);
  const [users, setUsers] = useState([]);  
  const [messages, setMessages] = useState([]);
  const [showUserDetail, setShowUserDetail] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      console.error("❌ No user data found");
      toast.error("User data missing. Redirecting to signup.", { position: "top-right" });
      navigate("/");
      return;
    }

    // ✅ Fetch all users except the current user
    axios.get(`${API_BASE_URL}/api/auth/users`)
      .then((res) => {
        const otherUsers = res.data.filter(user => user._id !== currentUser._id);
        setUsers(otherUsers);
      })
      .catch((err) => console.error("❌ Error fetching users:", err));

    socket.emit("userOnline", currentUser._id);

    return () => {
      socket.emit("userOffline", currentUser._id);
    };
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!receiver) return;

    // ✅ Fetch previous messages when receiver is selected
    axios.get(`${API_BASE_URL}/api/messages/${currentUser._id}/${receiver._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("❌ Error fetching messages:", err));

    // ✅ Listen for new messages and update state in real-time
    const handleNewMessage = (newMessage) => {
      if (
        (newMessage.senderId === receiver._id && newMessage.receiverId === currentUser._id) || 
        (newMessage.senderId === currentUser._id && newMessage.receiverId === receiver._id)
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => socket.off("receiveMessage", handleNewMessage);
  }, [receiver, currentUser]);

  const sendMessage = (messageContent) => {
    if (!messageContent.trim() || !currentUser || !receiver) {
      console.error("❌ Missing sender or receiver details");
      toast.error("Please select a user to chat with.", { position: "top-right" });
      return;
    }

    const newMessage = {
      senderId: currentUser._id,
      receiverId: receiver._id,
      content: messageContent,
      timestamp: new Date().toISOString(), // ✅ Send timestamp
    };

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className={`chat-container ${showUserDetail ? "expanded" : ""}`}>
      <div className="sidebar">
        {/* ✅ User Selection */}
        <UserList users={users} setReceiver={setReceiver} />
      </div>

      <div className="chat-area">
        {receiver && (
          <h2 className="chat-header" onClick={() => setShowUserDetail(true)}>
            {receiver.name}
          </h2>
        )}

        {/* ✅ Messages and Input combined */}
        <MessageList messages={messages} currentUser={currentUser} sendMessage={sendMessage} />
      </div>

      {/* ✅ Show User Details if enabled */}
      {showUserDetail && <UserDetail receiver={receiver} onClose={() => setShowUserDetail(false)} />}
    </div>
  );
};

export default Dashboard;
