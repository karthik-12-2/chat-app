import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "GroupUser",
      required: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "GroupUser",
      required: true,
    },
    message: {
      type: String,
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const GroupMessageModel = mongoose.model("GroupMessage", groupMessageSchema);
export default GroupMessageModel;
