import { server_url } from "../../config.json";
import io from "socket.io-client";

let socket;

export const initWebSocket = (accessToken) => {
  socket = io(`http://${server_url.replace(/^http:\/\//, "")}`);

  socket.on("connect", () => {
    console.log("WebSocket connection established");
    socket.emit("auth", { token: accessToken });
  });

  socket.on("message", (data) => {
    console.log("Received message:", data);
    // Handle messages here
  });

  socket.on("connect_error", (error) => {
    console.error("WebSocket connection error:", error);
  });

  socket.on("disconnect", () => {
    console.log("WebSocket connection closed");
  });
};

export const closeWebSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const sendMessage = (message) => {
  if (socket && socket.connected) {
    socket.emit("message", message);
  } else {
    console.error("WebSocket is not connected");
  }
};
