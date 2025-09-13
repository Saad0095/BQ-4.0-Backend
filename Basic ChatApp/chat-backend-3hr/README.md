
# Chat Backend (3‑Hour Teaching Build)

A super simple **Node.js + Express + MongoDB + Socket.IO** chat backend designed to be built and understood in **~3 hours**.

## Features (MVP)
- Register/login with email + password (hashed with bcrypt) and **JWT** auth
- **Global room** real-time chat via Socket.IO
- Save messages to MongoDB
- Fetch **recent messages** (paginated)
- Clean and compact file structure

---

## Quick Start

### 1) Clone & Install
```bash
npm install
cp .env.example .env
# edit .env → MONGO_URI, JWT_SECRET, CLIENT_ORIGIN
```

### 2) Start MongoDB
- If you have MongoDB locally, you're good.
- Or use Docker:
```bash
docker run -d --name chat3hr-mongo -p 27017:27017 mongo:7
```

### 3) Run the Server
```bash
npm run dev
# or
npm start
```
Server runs on `http://localhost:${PORT}` (default 3000).

---

## REST Endpoints

### Auth
- **POST** `/api/auth/register` → `{ name, email, password }`
- **POST** `/api/auth/login` → `{ email, password }` → `{ token, user }`
- **GET** `/api/auth/me` → requires `Authorization: Bearer <token>`

### Messages
- **GET** `/api/messages?limit=20&beforeId=<messageId>` → recent messages (default 20)

---

## Socket.IO (namespace: `/chat`)

Connect with auth token:
```js
const socket = io("http://localhost:3000/chat", {
  auth: { token: "<JWT from /login>" }
});
```

Events:
- `message:send` → `{ text }` (server saves + broadcasts `message:new`)  
- `message:new` → `{ _id, text, sender: { _id, name }, createdAt }` (broadcast from server)
- `connect_error` → authentication errors

> This is a single-room global chat to keep things simple for a 3‑hour build.

---

## Minimal File Structure
```
src/
  server.js          # bootstraps express, http, socket.io
  config.js          # env + DB connection
  models/
    User.js
    Message.js
  middleware/
    auth.js          # JWT guard for REST
  routes/
    auth.routes.js
    message.routes.js
```

---

## Teaching Flow (Suggested 3 Hours)
1. **(25m)** Project init, env, Mongo connect, simple route
2. **(35m)** User model, register/login, JWT, `/me`
3. **(35m)** Message model, GET `/messages` with simple pagination
4. **(45m)** Socket.IO: auth on connect, `message:send` → store + broadcast
5. **(10m)** CORS, error handler, tidy up & Q&A

---

## License
MIT
