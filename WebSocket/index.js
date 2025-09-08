import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();

const httpServer = createServer(app);
app.use(express.static("public"));

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id);

  socket.on("chat", (msg) => {
    console.log("Message: ", msg);
    io.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => console.log("Server Running on localhost:3000"));
