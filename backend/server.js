const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// 🔥 MIDDLEWARE (ORDER MATTERS)
app.use(cors());
app.use(express.json()); // ✅ MUST be before routes

// 🔥 DATABASE CONNECTION
connectDB();

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("MoodRecipe API is running");
});
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

// 🔥 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
