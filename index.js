import express from 'express'
import connection from './database/db.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes.js';
const PORT = process.env.PORT || 5000;
// import { Server } from 'socket.io';
// import { createServer } from 'http';
import Pusher from 'pusher';

const URL = process.env.MONGODB_URI||'mongodb+srv://hannan:farhan@cluster0.d7qcp.mongodb.net/eroxer?retryWrites=true&w=majority';
const app = express();
//if this values is production then run this and on horuku its value is always production then it will run
//client which run through build, to run the front-end we have to create production build 
//and give it adress here.




app.use(bodyParser.json({ extended: true,limit: '60mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.listen(PORT);
app.use('/', router)
connection(URL);




// const io = new Server(8900, {
//   cors: {
//     origin: "http://localhost:3000",
   
//   }
// });
// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on('connection',(socket,req)=>{
//     console.log("connected");
//     socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    
//     io.to(receiverId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });
   
 
// })