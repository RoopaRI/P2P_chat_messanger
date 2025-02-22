import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";  
import socket from "../../socket";
import axios from "axios";
import API_BASE_URL from "../../config";
import { toast } from "react-toastify";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = location.state?.currentUser;
  
  const [receiver, setReceiver] = useState(null);
  const [users, setUsers] = useState([]);  // ✅ Store all users
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      console.error("❌ No user data found");
      toast.error("User data missing. Redirecting to signup.", { position: "top-right" });
      navigate("/"); // ✅ Redirect back to signup if user data is missing
      return;
    }

    // ✅ Fetch all users except the current user
    axios.get(`${API_BASE_URL}/api/auth/users`)
      .then((res) => {
        const otherUsers = res.data.filter(user => user._id !== currentUser._id);
        setUsers(otherUsers);
      })
      .catch((err) => console.error("❌ Error fetching users:", err));

    // ✅ Listen for new messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.off("receiveMessage");
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!receiver) return;

    // ✅ Fetch previous messages when receiver is selected
    axios.get(`${API_BASE_URL}/api/messages/${currentUser._id}/${receiver._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("❌ Error fetching messages:", err));
  }, [receiver, currentUser]);

  const sendMessage = () => {
    if (!message.trim() || !currentUser || !receiver) {
      console.error("❌ Missing sender or receiver details");
      toast.error("Please select a user to chat with.", { position: "top-right" });
      return;
    }

    const newMessage = {
      senderId: currentUser._id,
      receiverId: receiver._id,
      content: message,
    };

    console.log("📩 Sending message:", newMessage);

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Welcome, {currentUser?.name}! Start Chatting</h2>

      {/* ✅ User Selection */}
      <label>Select a user to chat with:</label>
      <select onChange={(e) => setReceiver(users.find(user => user._id === e.target.value))}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      {receiver && <h2>Chat with {receiver.name}</h2>}

      <div className="messages">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.senderId === currentUser._id ? "sent" : "received"}>
            {msg.content}
          </p>
        ))}
      </div>

      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message..." 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
