import express from 'express'
import connection from './database/db.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes.js';
import dotenv from 'dotenv';

dotenv.config();

process.env.GOOGLE_APPLICATION_CREDENTIALS;
const PORT = process.env.PORT || 5000;



const URL = process.env.MONGODB_URI||'mongodb+srv://hannan:farhan@cluster0.d7qcp.mongodb.net/eroxer?retryWrites=true&w=majority';
const app = express();

app.use(bodyParser.json({ extended: true,limit: '60mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.listen(PORT);
app.use('/', router);
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