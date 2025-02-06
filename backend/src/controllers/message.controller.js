import { io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getMessages = async (req, res) => {
  console.log("getMessage");
  try {
    const myId = req.user._id;
    const userToChatId = new mongoose.Types.ObjectId(req.params.id);

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json(message);
  } catch (error) {
    console.log("error in getMessages controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const { message, image } = req.body;

    let imageUri;
    if(image){
      const uploadedResponse = await cloudinary.uploader.upload(image)
      imageUri = uploadedResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: imageUri
    });

    if (newMessage) {
      await newMessage.save();
    }
    
    io.emit("new message", newMessage);
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestMessageEveryUser = async (req, res) => {
  console.log("starting");
  try {
    const userIds = await UserModel.find({}, { _id: 1 });
    let latestMessage = [];
    for (const userId of userIds) {
      const userLatestMessage = await Message.find({ receiverId: userId._id  })
        .sort({ _id: -1 })
        .limit(1);
      if (userLatestMessage) latestMessage.push(...userLatestMessage);
    }
    res.status(200).json(latestMessage);
  } catch (error) {
    console.log("error in getlatestmessageEveryUser controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
