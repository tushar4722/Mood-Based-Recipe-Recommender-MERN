const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= SIGNUP ================= */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number & special character"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ IMPORTANT: send user details
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};


/* ================= FORGOT PASSWORD (OTP) ================= */
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  console.log("OTP (Simulated):", otp);

  res.json({
    message: "OTP sent (simulated)",
    otp // only for demo
  });
};

/* ================= VERIFY OTP ================= */
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (
    !user ||
    user.otp !== otp ||
    user.otpExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified" });
};

/* ================= RESET PASSWORD ================= */
const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    {
      password: hashedPassword,
      otp: null,
      otpExpiry: null
    }
  );

  res.json({ message: "Password updated successfully" });
};

/* ================= EXPORTS ================= */
module.exports = {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword
};
