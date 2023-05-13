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
  console.log(req.body);
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
  let requests = [];
  let sendingUser = [];
  console.log(req.body);
  try {
    await creatingRequest
      .find({ $and: [{ recieverId: req.body.userId }, { status: "pending" }] })
      .then((data) => {
        if (data) {
          requests.push(data);
          // res.json({ message: "request Generated"});
        } else {
          res.json({ message: "request not Generated" });
        }
      });
    //  console.log( requests,"after initial")
    requests?.map(async (datas, index) => {
      const newId = new mongoose.Types.ObjectId(datas[index]?.senderId);

      await registeringUser.find({ _id: newId }).then((finalData) => {
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
  console.log(req.body);
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
  let requests = [];
  let sendingUser = [];
  console.log(req.body, "calling this");
  try {
    await creatingRequest
      .find({
        $or: [{ recieverId: req.body.userId }, { senderId: req.body.userId }],
        $and: [{ status: "accepted" }],
      })
      .then((data) => {
        if (data) {
          console.log(data, "calling this body");

          requests.push(data);
          // res.json({ message: "request Generated"});
        } else {
          res.json({ message: "server error" });
        }
      });
    //  console.log( requests,"after initial")
    requests?.map(async (datas, index) => {
      if (datas[index]?.senderId === req.body.userId) {
        const newId = new mongoose.Types.ObjectId(datas[index]?.recieverId);
        await registeringUser.find({ _id: newId }).then((finalData) => {
          sendingUser.push(finalData);
          console.log(sendingUser, "SendingUser====>");
        });
      }
      if (datas[index]?.recieverId === req.body.userId) {
        const newId = new mongoose.Types.ObjectId(datas[index]?.senderId);
        await registeringUser.find({ _id: newId }).then((finalData) => {
          sendingUser.push(finalData);
        });
      }

      if (requests.length === sendingUser.length) {
        res.json(sendingUser);
        console.log(sendingUser, "=========>sending accpeted User");
      }
    });
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};

export const getRequestBySenderId = async (req, res) => {
  let requests = [];
  let sendingUser = [];
  console.log(req.body);
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
