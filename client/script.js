const username = prompt("What is your username?");
const socket = io({ query: { username } });
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const addMsg = (fullMsg) => {
  var item = document.createElement("li");
  item.textContent = `${fullMsg.username} - ${fullMsg.msg}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    addMsg({ username, msg: input.value });
    socket.emit("chatMessage", input.value);
    input.value = "";
  }
});

socket.on("chatMessage", (fullMsg) => {
  addMsg(fullMsg);
});

socket.on("userConnect", ({ msg }) => {
  console.log(msg);
});

socket.on("userDisconnecting", ({ msg }) => {
  console.log(msg);
});
