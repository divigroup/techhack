import { io } from "socket.io-client";
// const socket = io.connect("http://localhost:4000");
const socket = io("http://192.168.1.36:5000");

export default socket;
