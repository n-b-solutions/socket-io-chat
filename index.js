const express = require("express");
const socketio = require("socket.io");

const app = express();
app.use(express.static(__dirname + "/client"));

const expressServer = app.listen(3333, () => {
  console.log("listening on http://localhost:3333");
});

const io = socketio(expressServer);

const chatRoom = "chat-room";

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;

  socket.join(chatRoom);

  // emit to the all connected users except to the sender
  socket.broadcast.emit("userConnect", {
    msg: `${username} connected the chat — take a second to say hello.`,
  });

  socket.on("disconnecting", (socket) => {
    // emit to the all connected users, the sender is no longer connect..
    io.emit("userDisconnecting", { msg: `${username} is disconnecting` });
  });

  socket.on("chatMessage", (msg) => {
    const fullMsg = {
      username,
      msg,
    };
    // emit to the all users in the chat-room except of the sender
    socket.broadcast.to(chatRoom).emit("chatMessage", fullMsg);
  });

  socket.on("typing", () => {
    socket.broadcast.to(chatRoom).emit("memberTyping", { username });
  });
});
