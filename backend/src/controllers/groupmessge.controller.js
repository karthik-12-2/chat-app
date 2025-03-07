import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import GroupMessageModel from "../models/groupmessage.model.js";
import groupUserModel from "../models/groupuser.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { sid, gid } = req.params;
    const { message, image } = req.body;

    let imageUri;
    if(image) {
      const uploadedResponse = await cloudinary.uploader.upload(image)
      imageUri = uploadedResponse.secure_url
    }

    const newMessage = new GroupMessageModel({
      senderId: sid,
      receiverId: gid,
      message: message,
      image: imageUri
    });

    if (newMessage) {
      await newMessage.save();
    }

    io.emit("newgroupmessage", newMessage);   
  } catch (error) {
    console.log("error from sendMessage group controller", error);
    return res.status(500).json("Interanl Server Error");
  }
};

export const getMessage = async (req, res) => {
  try {
    const { gid } = req.params;
    const message = await GroupMessageModel.find({receiverId: gid})
    res.status(200).json(message)
  } catch (error) {
    console.log("error from getMessage group controller", error);
    return res.status(500).json("Interanl Server Error");
  }
};

export const fetchlatestgroupmessages = async (req, res) => {
  console.log("starting");
  try {
    const userIds = await groupUserModel.find({}, { _id: 1 });
    let latestMessage = [];
    for (const userId of userIds) {
      const userLatestMessage = await GroupMessageModel.find({ receiverId: userId._id  })
        .sort({ _id: -1 })
        .limit(1);
      if (userLatestMessage) latestMessage.push(...userLatestMessage);
    }
    res.status(200).json(latestMessage);
  } catch (error) {
    console.log("error in fetchlatestgroupmessages controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
