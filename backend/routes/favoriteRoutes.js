const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ❌ REMOVE FAVORITE
router.delete("/:id", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);

  user.favorites = user.favorites.filter(
    (fav) => fav._id.toString() !== req.params.id
  );

  await user.save();
  res.json({ message: "Favorite removed" });
});


module.exports = router;
