// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   if (req.url === "/about") {
//     res.end("About Page");
//   } else if (req.url === "/contact") {
//     res.end("Contact Page");
//   } else {
//     res.end("Home Page");
//   }
// });
// server.listen(3000);


const express = require("express");
const app = express();
app.get("/", (_req, res) => {
  res.send("Welcome to HomePage");
});
app.get("/about", (_req, res) => {
  res.send("Welcome to About Page");
});

// app.get("/api/user", (_req, res) => {
//   res.json({ name: "Ali", age: 18 });
// });

app.get("/api/user", (req, res) => {
  const name = req.query.name;
  res.send(`Hello ${name}`);
});
app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Hello User ${id}`);
});

app.use(express.json()); 
app.post('/api/data', (req, res) => {
 console.log(req.body);
 res.send('Data received');
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
