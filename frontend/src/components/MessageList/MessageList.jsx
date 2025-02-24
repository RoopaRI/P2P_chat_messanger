import React, { useEffect, useRef } from "react";
import MessageInput from "../MessageInput/MessageInput";
import "./MessageList.css";

const MessageList = ({ messages, currentUser, sendMessage }) => {
  const lastMessageRef = useRef(null); // ✅ Reference to last message

  // ✅ Scroll to last message when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // ✅ Formats HH:MM AM/PM
  };

  return (
    <div className="messages-container">
      <div className="message-list">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-wrapper ${msg.senderId === currentUser._id ? "sent" : "received"}`}
            ref={idx === messages.length - 1 ? lastMessageRef : null} // ✅ Attach ref to last message
          >
            <div className={`message ${msg.senderId === currentUser._id ? "sent" : "received"}`}>
              <p className="message-content">{msg.content}</p>
              <span className="timestamp">{formatTime(msg.timestamp)}</span>
            </div>
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
