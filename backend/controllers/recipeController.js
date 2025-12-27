const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
  const { mood, weather } = req.query;

  let filter = {};

  if (mood) filter.mood = mood;
  if (weather) filter.weather = weather;

  const recipes = await Recipe.find(filter);
  res.json(recipes);
};

module.exports = { getRecipes };
