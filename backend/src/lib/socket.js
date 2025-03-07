import express from "express";
import { Server } from "socket.io";
import http from "http";
import { on } from "events";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const onlineUsers = [];
console.log(onlineUsers);

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("loggedin", (user) => {
    if (user) {
      const userExists = onlineUsers.findIndex(
        (onlineUser) => onlineUser.id === user.id
      );
      if (userExists === -1) {
        onlineUsers.push({ ...user, socketId: socket.id });
      }
    }
    io.emit("loggedinuser", onlineUsers);
    io.emit("totalusers", onlineUsers.length);
  });

  socket.on("loggedout", (user) => {
    let updatedOnlineUsers = onlineUsers.filter(
      (online) => online.id !== user.id
    );
    onlineUsers.length = 0;
    onlineUsers.push(...updatedOnlineUsers);
    io.emit("loggedoutuser", onlineUsers);
    io.emit("totalusers", onlineUsers.length);
    console.log("loggedout", socket.id);
  });

  socket.on("disconnet", () => {
    let updatedOnlineUsers = onlineUsers.filter(
      (online) => online.id !== user.id
    );
    onlineUsers.length = 0;
    onlineUsers.push(...updatedOnlineUsers);
    io.emit("loggedoutuser", onlineUsers);
    io.emit("totalusers", onlineUsers.length);
    console.log("user disconnected", socket.id);
  });

  socket.on("typing", (status) => {
    io.emit("typing", status);
  });

  socket.on("allusers", (users) => {
    io.emit("allusers", users);
  });

  socket.on("allgroups", (groups) => {
    io.emit("allgroups", groups);
  });
});

export { app, server, io };
