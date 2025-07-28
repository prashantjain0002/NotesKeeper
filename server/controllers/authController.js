import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET;

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/** @desc Sign up with OTP */
export const signup = async (req, res) => {
  const { name, email, dob } = req.body;

  if (!name || !email || !dob) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let user = await User.findOne({ email });
  if (user && user.isVerified) {
    return res.status(400).json({ message: "User already exists." });
  }

  const otp = generateOtp();

  if (user) {
    user.name = name;
    user.dob = dob;
    user.otp = otp;
  } else {
    user = new User({ name, email, dob, otp });
  }

  await user.save();

  try {
    await sendOtpEmail(email, otp, name);
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ message: "Failed to send OTP email." });
  }
};

/** @desc Login (send OTP to existing user) */
export const login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    return res.status(404).json({ message: "User not found. Please sign up." });
  }

  const otp = generateOtp();
  user.otp = otp;
  await user.save();

  try {
    await sendOtpEmail(email, otp, user.name);
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send OTP email." });
  }
};

/** @desc Verify OTP and issue token */
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp) {
    return res.status(401).json({ message: "Invalid OTP." });
  }

  user.isVerified = true;
  user.otp = null;
  await user.save();

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({
    message: "OTP verified successfully.",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
    },
  });
};





/** @desc Google Login */
export const googleLogin = async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId, isVerified: true });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google login failed" });
  }
};
