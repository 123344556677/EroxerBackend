import registeringUser from "../Schemas/Auth.js";
import creatingRequest from "../Schemas/Request.js";
import mongoose from "mongoose";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1592572",
  key: "78bfd9bc497cd883c526",
  secret: "79859c470de2032589c1",
  cluster: "ap1",
});

export const sendRequest = async (req, res) => {
  console.log(req.body,"====>");
  try {
    await creatingRequest.create(req.body).then((data) => {
      if (data) {
        res.json({ message: "request Generated" });
        pusher.trigger("request" + req.body.recieverId, "request", {
          userId: req.body.senderId,
          message: "Sent a Request",
          name: req.body.name,
        });
      } else {
        res.json({ message: "request not Generated" });
      }
    });
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};

export const getRequestById = async (req, res) => {
  let requests;
  let sendingUser=[];
  console.log(req.body,"======>");
  try {
    await creatingRequest
      .find({ $and: [{ recieverId: req.body.userId }, { status: "pending" }] })
      .then((data) => {
        if (data) {
          requests=data;
          // res.json({ message: "request Generated"});
        } else {
          res.json({ message: "request not Generated" });
        }
      });
    //  console.log( requests,"after initial")
    requests?.map(async (datas, index) => {
      const newId = new mongoose.Types.ObjectId(datas?.senderId);

      await registeringUser.findOne({ _id: newId }).then((finalData) => {
        sendingUser.push(finalData);
        console.log(sendingUser, "SendingUser====>");
      });
      if (requests.length === sendingUser.length) {
        res.json(sendingUser);
      }
    });
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};

export const changeRequestStatus = async (req, res) => {
  console.log(req.body,"==========>");
  try {
    await creatingRequest.findOneAndUpdate(
      {
        $and: [
          { recieverId: req.body.recieverId },
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

export const getAllAcceptedUsers = async (req, res) => {
  let requests;
  let sendingUser = [];
  console.log(req.body, "======>calling this");
  console.log(req.body,"======>");
  try {
    await creatingRequest
      .find({
        $or: [{ recieverId: req.body.userId }, { senderId: req.body.userId }],
        $and: [{ status: "accepted" }],
      })
      .then((data) => {
        if (data) {
          console.log(data, "calling this body");

          requests=data;
          // res.json({ message: "request Generated"});
        } else {
          res.json({ message: "server error" });
        }
      });
     console.log( requests,"after initial")
    //  let i;
    //  for(i=0;i<=requests.length;i++){
    //     if (requests[i]?.senderId === req.body.userId) {
    //     const newId = new mongoose.Types.ObjectId(requests[i]?.recieverId);
    //     await registeringUser.findOne({ _id: newId }).then((finalData) => {
    //       sendingUser.push(finalData);
    //       console.log(finalData, "SendingUser====>");
    //     });
    //   }
    //   if (requests[i]?.recieverId === req.body.userId) {
    //     const newId = new mongoose.Types.ObjectId(requests[i]?.senderId);
    //     await registeringUser.findOne({ _id: newId }).then((finalData) => {
    //       sendingUser.push(finalData);
    //       console.log(finalData, "coming in this SendingUser====>");
    //     });
    //   }

    //  }
    requests?.map(async (datas, index) => {
      // console.log(datas.recieverId, "index");
      if (datas?.senderId === req.body.userId) {
        const newId = new mongoose.Types.ObjectId(datas?.recieverId);
        await registeringUser.findOne({ _id: datas?.recieverId }).then((finalData) => {
          sendingUser.push(finalData);
          console.log(finalData, "SendingUser====>");
        });
      }
      if (datas?.recieverId === req.body.userId) {
        const newId = new mongoose.Types.ObjectId(datas?.senderId);
        await registeringUser.findOne({ _id: newId }).then((finalData) => {
          sendingUser.push(finalData);
          console.log(finalData, "coming in this SendingUser====>");
        });
      }
if (requests.length === sendingUser.length) {
        res.json(sendingUser);
        console.log(sendingUser, "=========>sending accpeted User");
      }
      
    });
    console.log(sendingUser, "SendingUser array====>");
    
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};

export const getRequestBySenderId = async (req, res) => {
  let requests = [];
  let sendingUser = [];
  console.log(req.body,"==========>");
  try {
    await creatingRequest.find({ senderId: req.body.userId }).then((data) => {
      if (data) {
        res.json(data);
        // res.json({ message: "request Generated"});
      } else {
        res.json({ message: "request not Generated" });
      }
    });
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};
