import { server_url } from "../../config.json";

let socket;

export const initWebSocket = (accessToken) => {
  socket = new WebSocket(`ws://${server_url.replace(/^http:\/\//, "")}/ws`);

  socket.onopen = () => {
    console.log("WebSocket connection established");
    socket.send(JSON.stringify({ type: "auth", token: accessToken }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);

    // Handle messages here

    // Example:
    // if (data.type === "message") {
    //   handleMessage(data);
    // }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
