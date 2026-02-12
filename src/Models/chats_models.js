import mongoose from "mongoose";

const chats_Schema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  createAt: {
    type: String,
    default: Date.now,
  },
});

export const Chat = mongoose.model("Chat", chats_Schema);
