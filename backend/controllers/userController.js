const User = require("../models/User");

// GET PROFILE (already added)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// ✅ UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch {
    res.status(500).json({ message: "Profile update failed" });
  }
};

module.exports = { getProfile, updateProfile };
