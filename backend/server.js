const express = require("express");
const cors = require("cors");
require("dotenv").config();        // 👈 LOAD .env

const connectDB = require("./config/db"); // 👈 IMPORT DB
connectDB();                       // 👈 CONNECT DB

const app = express();

const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
app.use("/api/favorites", favoriteRoutes);


app.use("/api/auth", authRoutes);


app.use("/api/recipes", recipeRoutes);


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MoodRecipe API is running");
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
