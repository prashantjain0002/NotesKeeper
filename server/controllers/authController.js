import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET;

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const requestOtp = async (req, res) => {
  const { name, email, dob } = req.body;

  if (!name || !email || !dob) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const otp = generateOtp();
  let user = await User.findOne({ email });

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
      name: user.name,
      email: user.email,
      dob: user.dob,
    },
  });
};
