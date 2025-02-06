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
      if(user) {
            const userExists = onlineUsers.some(online => online.id === user.id)
            if(!userExists){
                  onlineUsers.push(user);
            }
            // console.log(userExists, '21')
      }
    io.emit("loggedinuser", onlineUsers);
    // console.log(onlineUsers, "now reload");
  });

  socket.on("loggedout", (user) => {
    // console.log(user, "from loggedout user");
    let updatedOnlineUsers = onlineUsers.filter(
      (online) => online.id !== user.id
    );
    onlineUsers.length = 0;
    onlineUsers.push(...updatedOnlineUsers);
    io.emit("loggedoutuser", onlineUsers);
    // console.log(onlineUsers, 'updatedOnline users')
  });

  socket.on("typing", (status) => {
    // console.log(status);
    io.emit("typing", status);
  });

  io.emit("totalusers", onlineUsers.length);

  socket.on('allusers', (users) => {
      // console.log(users, 'allusers socket 49')
      io.emit('allusers', users)
  })
});

export { app, server, io };
