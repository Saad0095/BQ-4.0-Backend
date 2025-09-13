import { JWT_SECRET } from "../config.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export default function registerChatHandlers(io){
  // Socket.IO namespace
  const chatNsp = io.of("/chat");

  // Authentication middleware
  chatNsp.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Missing token"));
      const payload = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(payload.sub);
      
      if (!user) return next(new Error("User not found"));
      console.log("Payload Sub: ", payload.sub);
      socket.data.user = { _id: user.id, name: user.name };
      next();
    } catch (e) {
        next(new Error("Invalid token"));
    }
});

chatNsp.on("connection", (socket) => {
    const user = socket.data.user;
    console.log(`[socket] connected: ${user.name} (${user._id})`);

    // Send last 20 messages upon connect
    (async () => {
      const recent = await Message.find({})
        .sort({ _id: -1 })
        .limit(20)
        .populate("senderId", "name");

      console.log("Recent msgs: ", recent);
      
      const payload = recent.reverse().map((m) => ({
        _id: m.id,
        text: m.text,
        sender: { _id: m.senderId.id, name: m.senderId.name },
        createdAt: m.createdAt,
      }));
      socket.emit("message:history", payload);
    })();

    socket.on("message:send", async (data, cb) => {
      try {
        const { text } = data || {};
        if (!text || typeof text !== "string" || !text.trim()) {
          return cb && cb({ ok: false, error: "Text is required" });
        }
        const msg = await Message.create({
          text: text.trim(),
          senderId: user._id,
        });
        const payload = {
          _id: msg.id,
          text: msg.text,
          sender: { _id: user._id, name: user.name },
          createdAt: msg.createdAt,
        };
        chatNsp.emit("message:new", payload);
        cb && cb({ ok: true, message: payload });
      } catch (e) {
        cb && cb({ ok: false, error: "Failed to send" });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket] disconnected:", reason);
    });
  });
};
