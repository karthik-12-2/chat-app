import express from "express";
import authRouter from "./src/routes/auth.route.js";
import createConnection from "./src/lib/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";
import groupMessageRouter from "./src/routes/groupmessage.route.js";
import groupUserRouter from "./src/routes/groupuser.route.js";
createConnection();

const PORT = 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/group/messages", groupMessageRouter);
app.use("/api/group/users", groupUserRouter);


server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
