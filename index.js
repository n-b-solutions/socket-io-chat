const express = require("express");
const socketio = require("socket.io");

const app = express();
app.use(express.static(__dirname + "/client"));

const expressServer = app.listen(3333, () => {
  console.log("listening on http://localhost:3333");
});

const io = socketio(expressServer);

io.on("connection", (socket) => {
  // emit to the all connected users except to the sender
  socket.broadcast.emit("userConnect", { msg: "A new user connected" });

  socket.on("disconnecting", (socket) => {
  // emit to the all connected users, the sender is no longer connect..
    io.emit("userDisconnecting", { msg: "user is disconnecting" });
  });

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });
});
