const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  mood: [String],
  weatherType: [String],
  description: String,
  image: String
});

module.exports = mongoose.model("Recipe", recipeSchema);
