import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: { type: String, unique: true },
  otp: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
