import React, { useState } from "react";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage(""); // ✅ Clear input after sending
  };

  return (
    <div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message..." 
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
