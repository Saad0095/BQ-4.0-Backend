const express = require("express");
require('./db/index')

const app = express();
app.use(express.json());

const userRoutes = require('./models/user')

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use('user', userRoutes)

app.listen(3000);
