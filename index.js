const express = require("express");
const socketio = require("socket.io");

const app = express();
app.use(express.static(__dirname + "/client"));

const expressServer = app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });
});
