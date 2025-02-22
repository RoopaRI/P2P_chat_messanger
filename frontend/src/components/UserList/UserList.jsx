import React from "react";

const UserList = ({ users, setReceiver }) => {
  return (
    <div>
      <label>Select a user to chat with:</label>
      <select onChange={(e) => setReceiver(users.find(user => user._id === e.target.value))}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserList;
