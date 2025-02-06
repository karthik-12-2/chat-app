import mongoose from "mongoose";

const groupUserSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    groupMembers: {
      type: Array,
      required: true,
    },
    createdBy: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const groupUserModel = mongoose.model('GroupUser', groupUserSchema)

export default groupUserModel
