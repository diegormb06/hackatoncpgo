import WebSocket from "App/services/WebSocket";
WebSocket.boot();

/**
 * Listen for incoming socket connections
 */
WebSocket.io.on("connection", (socket) => {
  socket.emit("news", { AutoFast: "Conectado!" });

  socket.on("my other event", (data) => {
    console.log(data);
  });
});
