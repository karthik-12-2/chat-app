import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const onlineUsers = [];

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("loggedin", (user) => {
    if (user) {
      const userExists = onlineUsers.some((online) => online.id === user.id);
      if (!userExists) {
        onlineUsers.push(user);
      }
    }
    io.emit("loggedinuser", onlineUsers);
  });

  socket.on("loggedout", (user) => {
    let updatedOnlineUsers = onlineUsers.filter(
      (online) => online.id !== user.id
    );
    onlineUsers.length = 0;
    onlineUsers.push(...updatedOnlineUsers);
    io.emit("loggedoutuser", onlineUsers);
  });

  socket.on("typing", (status) => {
    io.emit("typing", status);
  });

  io.emit("totalusers", onlineUsers.length);

  socket.on("allusers", (users) => {
    io.emit("allusers", users);
  });

  socket.on("allgroups", (groups) => {
    io.emit("allgroups", groups);
  });
});

export { app, server, io };
