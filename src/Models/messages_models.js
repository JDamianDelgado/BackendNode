import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Messages = mongoose.model("Messages", messagesSchema);
