import Pusher from 'pusher';
import creatingChat from '../Schemas/chat.js';

const pusher = new Pusher({
appId: "1592572",
key: "78bfd9bc497cd883c526",
secret: "79859c470de2032589c1",
cluster:"ap1"
});

export const sendMessage = async (req, res) => {
 
    const roomId=req.body.roomId;
    const message=req.body.message;
    const senderId=req.body.userId
    
    try {
    console.log(req.body,"=========>body")
        
    await pusher.trigger("chat", 'message', {
        username:senderId,
        message: message
       
    })
    .then((data)=>{
        console.log(data,"=========>after data")
        const messages= new creatingChat({ 
            senderId:senderId,
            recieverId:roomId,
            message:message,
             });
        messages.save();
    })


        
        
    }
    catch (err) {
     console.log(err)
    }
}
export const sendAlert = async (req, res) => {
 
    const roomId=req.body.roomId;
    const message=req.body.message;
    const senderId=req.body.userId
    const  name=req.body.name
    
    try {
    console.log(req.body,"alert=========>body")
        
    await pusher.trigger(roomId, 'client-alert', {
        username:senderId,
        message: message,
        name:name
       
    })
    


        
        
    }
    catch (err) {
     console.log(err)
    }
}

export const getAllChatsById=async(req,res)=>{
    const recieverId=req.body.recieverId;
    const senderId=req.body.senderId
    console.log(req.body);
    try {
      await creatingChat.find({
  $or: [
    { senderId: senderId, recieverId: recieverId },
    { senderId:recieverId, recieverId:senderId }
  ]
}).sort({ timestamp: 1 })
 .then((data)=>{
    res.json(data);
 })

    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}
export const makeCall=async(req,res)=>{
   const { callerId, accepterId } = req.body;
    console.log(req.body);
    try {
     
   

  pusher.trigger(`call`, 'new-call', { callerId,accepterId });
 

    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}


