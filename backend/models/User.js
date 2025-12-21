const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [favoriteSchema]
});

module.exports = mongoose.model("User", userSchema);
