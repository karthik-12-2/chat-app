import { io } from "socket.io-client";

const socket = io("ws://localhost:5000");
socket.connect()

export { socket };
