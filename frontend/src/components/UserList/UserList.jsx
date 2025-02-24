import React, { useState, useEffect } from "react";
import "./UserList.css";
import Logo from '../../assets/logo.png';

const UserList = ({ users, setReceiver }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Filter users when the search query changes
  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  return (
    <div className="user-list">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="signup-logo" />
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        className="user-search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Users List */}
      <div className="user-items">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div 
              key={user._id} 
              className="user-item" 
              onClick={() => setReceiver(user)}
            >
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          ))
        ) : (
          <p className="no-users">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
