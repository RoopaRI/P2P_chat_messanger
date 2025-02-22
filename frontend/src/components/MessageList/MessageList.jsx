import React from "react";

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="messages">
      {messages.map((msg, idx) => (
        <p key={idx} className={msg.senderId === currentUser._id ? "sent" : "received"}>
          {msg.content}
        </p>
      ))}
    </div>
  );
};

export default MessageList;
