import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { fetchMessages } from "../lib/api.js";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
const NAMESPACE = import.meta.env.VITE_SOCKET_NAMESPACE || "/chat";
const SOCKET_PATH = import.meta.env.VITE_SOCKET_PATH || "/socket.io";

export default function Chat({ user }) {
  console.log("user : ", user);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const listRef = useRef(null);

  const socket = useMemo(() => {
    const token = localStorage.getItem("token");
    return io(API_BASE + NAMESPACE, {
      path: SOCKET_PATH,
      auth: { token },
    });
  }, []);

  useEffect(() => {
    // initial fetch as a fallback (server also emits 'message:history' on connect)
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchMessages(token);
        setMessages(data);
        scrollToBottom();
      } catch (e) {
        // ignore
      }
    })();

    socket.on("message:history", (list) => {
      setMessages(list);
      scrollToBottom();
    });
    socket.on("message:new", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });
    socket.on("connect_error", (err) => {
      console.log(err);
      setError(err?.message || "Socket error");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  function scrollToBottom() {
    // small delay to allow DOM to paint
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, 0);
  }

  function formatTime(iso) {
    try {
      return new Date(iso).toLocaleTimeString();
    } catch {
      return "";
    }
  }

  function you(me) {
    return me?._id === user?.id || me?._id === user?._id;
  }

  function handleSend(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    socket.emit("message:send", { text: trimmed }, (ack) => {
      if (!ack?.ok) setError(ack?.error || "Failed to send");
    });
    setText("");
  }

  return (
    <div>
      <div ref={listRef} className="messages">
        {messages.map((m) => (
          <div className="msg" key={m._id}>
            <span className="name">{you(m.sender) ? "You" : m?.sender?.name || "Anon"}:</span>
            <span>{m.text}</span>
            <span className="muted" style={{ marginLeft: "auto" }}>
              {formatTime(m.createdAt)}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="row" style={{ marginTop: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
        />
        <button className="primary">Send</button>
      </form>

      {error && (
        <p className="error" style={{ marginTop: 8 }}>
          {error}
        </p>
      )}
    </div>
  );
}
