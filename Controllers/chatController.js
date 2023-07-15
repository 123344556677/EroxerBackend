import Pusher from 'pusher';
import creatingChat from '../Schemas/chat.js';
import creatingCall from '../Schemas/Call.js';
import registeringUser from "../Schemas/Auth.js";
import mongoose from "mongoose";

const pusher = new Pusher({
appId: "1592572",
key: "78bfd9bc497cd883c526",
secret: "79859c470de2032589c1",
cluster:"ap1"
});

export const sendMessage = async (req, res) => {
 
    const roomId=req.body.roomId;
    const message=req.body.message;
    const senderId=req.body.userId;
    const timeStamp=req.body.timeStamp;
    
    try {
    console.log(req.body,"=========>body")
        
    await pusher.trigger("chat"+senderId+roomId, 'message',{
        username:senderId,
        message: message
       
    })
    .then((data)=>{
        console.log(data,"=========>after data")
        const messages= new creatingChat({ 
            senderId:senderId,
            recieverId:roomId,
            message:message,
             timeStamp:timeStamp
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
    console.log(req.body)
    
    try {
    console.log(req.body,"alert=========>body")
     await creatingCall.create({
     roomId:roomId,
     message:message,
     senderId:senderId,
     name:name

     }).then((data) => {
       if (data) { 
        res.json({ message: "call Generated" });
      pusher.trigger(roomId, 'client-alert', {
        senderId:senderId,
        message: message,
        name:name
       
    })
    
  }
  else {
        res.json({ message: "call not Generated" });
      }
   });
  


        
        
    }
    catch (err) {
     console.log(err)
    }
}
export const changeCallStatus = async (req, res) => {
  console.log(req.body);
  try {
    await creatingCall.findOneAndUpdate(
      {
        $and: [
          { roomId: req.body.recieverId },
          { senderId: req.body.senderId },
          { status: "pending" },
        ],
      },
      req.body
    );
    // .then((data)=>{
    // if(data){

    //     res.json({ message: "request Generated"});
    // }
    // else{

    //    res.json({ message: "request not Generated"});
    // }
    // })
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};
export const changeAllCallStatus = async (req, res) => {
  console.log(req.body,"cll----->");
  try {
    await creatingCall.updateMany(
      {roomId:req.body.userId},
      { $set: { status: 'seen' } }
      
    ).then((data)=>{
      console.log(data)
      res.json({ message: "updated" });
    })
    // .then((data)=>{
    // if(data){

    //     res.json({ message: "request Generated"});
    // }
    // else{

    //    res.json({ message: "request not Generated"});
    // }
    // })
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};
// export const getCallById = async (req, res) => {
//   let requests;
//   let sendingUser=[];
//   console.log(req.body);
//   try {
//     await creatingCall
//       .find({ $and: [{ roomId: req.body.userId }, { status: "pending" }] })
//       .then((data) => {
//         if (data) {
//           requests=data;
//           // res.json({ message: "request Generated"});
//         } else {
//           res.json({ message: "request not Generated" });
//         }
//       });
//     //  console.log( requests,"after initial")
//     requests?.map(async (datas, index) => {
//       const newId = new mongoose.Types.ObjectId(datas?.senderId);

//       await registeringUser.findOne({ _id: newId }).then((finalData) => {
//         sendingUser.push(finalData);
//         console.log(sendingUser, "SendingUser====>");
//       });
//       if (requests.length === sendingUser.length) {
//         res.json(sendingUser);
//       }
//     });
//   } catch (err) {
//     res.json({ message: "Server Error" });
//   }
// };

export const getCallById = async (req, res) => {
  try {
    const requests = await creatingCall
      .find({ roomId: req.body.userId, status: "pending" });

    const sendingUserPromises = requests.map(async (data) => {
      const finalData = await registeringUser.findOne({ _id: data.senderId });
      return finalData;
    });

    const sendingUser = await Promise.all(sendingUserPromises);

    res.json(sendingUser);
    console.log(sendingUser, "SendingUser====>");
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};
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
export const getLastMessage=async(req,res)=>{
   console.log(req.body,"LAST MESSAGE---->")
   let lastMessageArray=[]
   
    try {
        req.body?.map(async(data)=>{

        
     const recieverId=data.recieverId;
    const senderId=data.senderId
   

      await creatingChat.findOne({
    
  $or: [
    { senderId: senderId, recieverId: recieverId },
    { senderId:recieverId, recieverId:senderId }
  ]
}).sort({ _id: -1 }).exec()
 .then((data)=>{
    lastMessageArray.push(data)
    console.log(data,"------>last message")
 })
 if (req.body.length === lastMessageArray.length) {
        res.json(lastMessageArray);
        console.log(lastMessageArray, "=========>sending last message");
      }
 })
 

    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}
export const updateReadStatus=async(req,res)=>{
   console.log(req.body,"last read status")
   
   
    try {
        

        
     const recieverId=req.body.recieverId;
    const senderId=req.body.senderId
   

      await creatingChat.updateMany({
    
  $or: [
    { senderId: senderId, recieverId: recieverId },
    { senderId:recieverId, recieverId:senderId }
  ],
  readStatus:true

})
 .then((data)=>{
  
    console.log(data,"------>last message")
     res.json({message:"updated"});

 })

 

    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}
export const updatePicStatus= async (req, res) => {
  console.log(req.body,"==========>id");
  try {
        console.log(req.body)
        creatingChat.findOneAndUpdate(
        { _id: req.body.id },
        {$set:{ picReadStatus:true}},
        { upsert:true, new: true } 
        )
      .then(() => {
        console.log('status updated');
         res.json({message:"updated"});
      })
      .catch((error) => {
        console.error('status not updated:', error);
         res.json({message:"status not updated"});
      })
      
    }
    // .then((data)=>{
    // if(data){

    //     res.json({ message: "request Generated"});
    // }
    // else{

    //    res.json({ message: "request not Generated"});
    // }
    // })
  catch (err) {
    res.json({ message: "Server Error" });
  }
};



