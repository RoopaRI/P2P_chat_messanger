# P2P Chat Messenger

## Overview

P2P Chat Messenger is a real-time chat application built with React.js, Node.js (Express.js), MongoDB (Atlas), and Socket.IO. The app allows users to sign up, search for other users, and engage in instant messaging with real-time updates.

## Features

- **User Signup:** No login required, users sign up with Name, Email, and Mobile Number.
- **Real-time Chat:** Messages are exchanged instantly using WebSockets.
- **User List & Search:** Fetch and search registered users to start conversations.
- **Message History:** Messages are stored in MongoDB and fetched when opening a chat.
- **Message Timestamps:** Messages include timestamps displayed inside each message bubble.
- **Auto-scroll to Last Message:** Ensures the latest message is always visible.
- **Send on Enter Key:** Users can send messages by pressing "Enter."
- **User Details Panel:** Clicking on a user displays their profile details.
- **Responsive Layout:** Sidebar (User List), Chat Area (Messages), and User Details.

## Tech Stack

### Frontend:
- React.js
- React Router
- Axios
- Socket.IO Client
- CSS (Responsive UI)

### Backend:
- Node.js with Express.js
- MongoDB (Atlas) for database
- Socket.IO for real-time messaging
- CORS for cross-origin requests

## Installation

### Prerequisites:
- Node.js installed
- MongoDB Atlas account

---
### Steps to Run:

#### Clone the Repository
```sh
git clone https://github.com/your-repo/p2p-chat-messenger.git
cd p2p-chat-messenger
```
---
### Setup Backend
```sh
cd backend
npm install
```

### Create a .env file in the backend folder and add:
```ini
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/chat_users
PORT=5000
```
### Start the backend server:
```sh
npm start
```
---
### Setup Frontend
```sh 
cd ../frontend
npm install
```

### Update config.js:
```sh
const API_BASE_URL = "http://localhost:5000";
export default API_BASE_URL;
```

### Start the frontend:
```sh
npm start
```
---
## Usage

1. **Sign up** using Name, Email, and Mobile Number.
2. **Search for users** in the sidebar.
3. **Click on a user** to open the chat.
4. **Send messages** instantly via WebSockets.
5. **Click on the username** in the chat header to view user details.
6. **Close user details** to return to the chat layout.
