import React from "react";
import MessageInput from "../MessageInput/MessageInput";
import "./MessageList.css";

const MessageList = ({ messages, currentUser, sendMessage }) => {
  return (
    <div className="messages-container">
      <div className="message-list">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`message-wrapper ${msg.senderId === currentUser._id ? "sent" : "received"}`}
          >
            <p className={`message ${msg.senderId === currentUser._id ? "sent" : "received"}`}>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="message-input-wrapper">
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default MessageList;
