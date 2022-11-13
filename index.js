const express = require("express");
const socketio = require("socket.io");

const app = express();
app.use(express.static(__dirname + "/client"));

const expressServer = app.listen(3333, () => {
  console.log("listening on http://localhost:3333");
});

const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });
});
