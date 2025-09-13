const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
const connectDB = require("./config/db");
const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
