const Recipe = require("../models/Recipe");

exports.getRecipes = async (req, res) => {
  const { mood, weatherType } = req.query;

  try {
    const recipes = await Recipe.find({
      mood: mood,
      weatherType: weatherType
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
