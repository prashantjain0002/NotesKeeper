import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Note", noteSchema);
