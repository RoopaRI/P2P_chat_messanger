require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const Message = require("./models/Message");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const corsOptions = {
  origin: ["http://localhost:3000", "https://p2-p-chat-messanger.vercel.app"], // ✅ Allow frontend on Vercel
  methods: ["GET", "POST"],
  credentials: true,
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("userOnline", (userId) => {
    if (userId) {
      onlineUsers.set(userId, socket.id);
      io.emit("updateUserStatus", { userId, isOnline: true });
      console.log(`✅ User ${userId} is online`);
    }
  });

  socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
    console.log("📩 Received message data:", { senderId, receiverId, content, timestamp: new Date() });

    if (!senderId || !receiverId || !content) {
      console.error("❌ Missing required fields:", { senderId, receiverId, content });
      return;
    }

    try {
      const newMessage = new Message({ senderId, receiverId, content, timestamp: new Date() });
      await newMessage.save();
      console.log("✅ Message saved:", newMessage);

      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMessage);
      }
    } catch (error) {
      console.error("❌ Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        io.emit("updateUserStatus", { userId, isOnline: false });
        console.log(`❌ User ${userId} disconnected`);
        break;
      }
    }
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
