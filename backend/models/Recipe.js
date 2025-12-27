const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  mood: String,        // Happy, Sad, Lazy, etc.
  weather: String,     // Cold, Warm, Rainy
  ingredients: [String],
  steps: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
