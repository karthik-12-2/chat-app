import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  fetchlatestgroupmessages,
  getMessage,
  sendMessage,
} from "../controllers/groupmessge.controller.js";
const groupMessageRouter = express.Router();

groupMessageRouter.post("/sendmessage/:gid/:sid", protectedRoute, sendMessage);
groupMessageRouter.get("/getmessage/:gid", protectedRoute, getMessage);
groupMessageRouter.get(
  "/fetchlatestgroupmessages/message",
  protectedRoute,
  fetchlatestgroupmessages
);

export default groupMessageRouter;
