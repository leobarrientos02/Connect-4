const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3000; // default
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder path
app.use(express.static(path.join(__dirname, "public")));

// Start server
server.listen(PORT, () => console.log(`server running on port ${PORT}`));

// Handle socket connection requests from web clieny

const connections = [null, null];
io.on("connection", (socket) => {
  console.log("New WS Connection");

  // Find an available player numiber
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }
  socket.emit("player-number", playerIndex);

  console.log(`Player ${playerIndex} connected`);

  if (playerIndex === -1) return;
});
