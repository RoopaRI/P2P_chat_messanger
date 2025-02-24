import React, { useState } from "react";
import "./MessageInput.css";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage(""); // ✅ Clear input after sending
  };

  return (
    <div className="message-input-container">
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message..." 
        className="message-input"
      />
      <button onClick={handleSendMessage} className="send-button">Send</button>
    </div>
  );
};

export default MessageInput;
