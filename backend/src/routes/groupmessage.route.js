import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  fetchlatestgroupmessages,
  getMessage,
  sendMessage,
} from "../controllers/groupmessge.controller.js";
const groupMessageRouter = express.Router();

groupMessageRouter.get(
  "/fetchlatestgroupmessages/message",
  protectedRoute,
  fetchlatestgroupmessages
);
groupMessageRouter.get("/getmessage/:gid", protectedRoute, getMessage);
groupMessageRouter.post("/sendmessage/:gid/:sid", protectedRoute, sendMessage);

export default groupMessageRouter;
