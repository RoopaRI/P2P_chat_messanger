import { io } from "socket.io-client";
import API_BASE_URL from "./config";

const socket = io(API_BASE_URL, {
  transports: ["websocket", "polling"], // ✅ Ensure WebSocket works in all cases
  withCredentials: true, // ✅ Allow cross-origin cookies
});

export default socket;
