import registeringUser from "../Schemas/Auth.js";
import creatingRequest from "../Schemas/Request.js";
import mongoose from "mongoose";
import Pusher from "pusher";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51MaOSqE6HtvcwmMAEFBEcSwTQIBNvQVzAXJc1cnrFoKIQbIH7i7KfcjxtB0DsRiRECgIaGb30vlq4fVSB6uaHsP400S1cZv15n"
);

const pusher = new Pusher({
  appId: "1592572",
  key: "78bfd9bc497cd883c526",
  secret: "79859c470de2032589c1",
  cluster: "ap1",
});

export const sendRequest = async (req, res) => {
  console.log(req.body, "====>here");
  try {
    const payment = stripe.paymentIntents
      .create({
        amount: 100 * 100,
        currency: "SEK",
        description: "testing",
        payment_method: req.body.paymentId,
        confirm: true,
      })
      .then((paymentIntents) => {
        console.log(paymentIntents);

        if (paymentIntents.status === "succeeded") {
          creatingRequest.create(req.body).then((datas) => {
            if (datas) {
              res.json({ message: "payment Successfull", status: 200 });
            } else {
              res.json({ message: "payment not Successfull", status: 400 });
            }
          });
        }
      });
    // pusher.trigger("request" + req.body.recieverId, "request", {
    //   userId: req.body.senderId,
    //   message: "Sent a Request",
    //   name: req.body.name,
    // });
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};

export const getRequestById = async (req, res) => {
  let requests;
  let sendingUser = [];
  console.log(req.body, "======>");
  try {
    await creatingRequest
      .find({ $and: [{ recieverId: req.body.userId }, { status: "pending" }] })
      .then((data) => {
        if (data) {
          requests = data;
          // res.json({ message: "request Generated"});
        } else {
          res.json({ message: "request not Generated", status: 400 });
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
        res.json({ message: "Success", status: 200, data:sendingUser });
      }
    });
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};

export const changeRequestStatus = async (req, res) => {
  console.log(req.body, "==========>");
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
    res.json({ message: "Server Error", status: 500 });
  }
};

// export const getAllAcceptedUsers = async (req, res) => {
//   let requests;
//   let sendingUser = [];
//   console.log(req.body, "======>calling this");
//   console.log(req.body,"======>");
//   try {
//     await creatingRequest
//       .find(  { senderId: req.body.userId })
//       .then((data) => {
//         if (data) {
//           console.log(data, "calling this body");

//           requests=data;
//           // res.json({ message: "request Generated"});
//         } else {
//           res.json({ message: "server error" });
//         }
//       });
//      console.log( requests,"after initial")
//     //  let i;
//     //  for(i=0;i<=requests.length;i++){
//     //     if (requests[i]?.senderId === req.body.userId) {
//     //     const newId = new mongoose.Types.ObjectId(requests[i]?.recieverId);
//     //     await registeringUser.findOne({ _id: newId }).then((finalData) => {
//     //       sendingUser.push(finalData);
//     //       console.log(finalData, "SendingUser====>");
//     //     });
//     //   }
//     //   if (requests[i]?.recieverId === req.body.userId) {
//     //     const newId = new mongoose.Types.ObjectId(requests[i]?.senderId);
//     //     await registeringUser.findOne({ _id: newId }).then((finalData) => {
//     //       sendingUser.push(finalData);
//     //       console.log(finalData, "coming in this SendingUser====>");
//     //     });
//     //   }

//     //  }
//     requests?.map(async (datas, index) => {
//       // console.log(datas.recieverId, "index");
//       if (datas?.senderId === req.body.userId) {
//         const newId = new mongoose.Types.ObjectId(datas?.recieverId);
//         await registeringUser.findOne({ _id: datas?.recieverId }).then((finalData) => {
//           sendingUser.push(finalData);
//           console.log(finalData, "SendingUser====>");;
//         });
//       }
//       {
//       // if (datas?.recieverId === req.body.userId) {
//       //   const newId = new mongoose.Types.ObjectId(datas?.senderId);
//       //   await registeringUser.findOne({ _id: newId }).then((finalData) => {
//       //     sendingUser.push(finalData);
//       //     console.log(finalData, "coming in this SendingUser====>");
//       //   });
//       // }
//     }
// if (requests.length === sendingUser.length) {
//         res.json(sendingUser);
//         console.log(sendingUser, "=========>sending accpeted User");
//       }

//     });
//     console.log(sendingUser, "SendingUser array====>");

//   } catch (err) {
//     res.json({ message: "Server Error" });
//   }
// };

// export const getSubscriptionByRecieverId = async (req, res) => {
//   let subscribeUser;
//    let sendingUser = [];
//   console.log(req.body,"==========>");
//   try {
//     await creatingRequest.find({ recieverId: req.body.userId })
//     .sort({ timestamp: -1 }).then((data) => {
//       if (data) {
//         // res.json(data);
//         subscribeUser=data
//         // res.json({ message: "request Generated"});
//       } else {
//         res.json({ message: "request not Generated" });
//       }
//     });
//    subscribeUser?.map(async (datas, index) => {
//       // console.log(datas.recieverId, "index");

//         // const newId = new mongoose.Types.ObjectId(datas?.senderId);
//         await registeringUser.findOne({ _id: datas?.senderId }).then((finalData) => {
//           sendingUser.push({
//             userData:finalData,
//           paymentData:datas});

//         });

//       {
//       // if (datas?.recieverId === req.body.userId) {
//       //   const newId = new mongoose.Types.ObjectId(datas?.senderId);
//       //   await registeringUser.findOne({ _id: newId }).then((finalData) => {
//       //     sendingUser.push(finalData);
//       //     console.log(finalData, "coming in this SendingUser====>");
//       //   });
//       // }
//     }
// if (subscribeUser.length === sendingUser.length) {
//         res.json(sendingUser);
//         console.log(sendingUser, "=========>sending accpeted User");
//       }

//     });
//   } catch (err) {
//     res.json({ message: "Server Error" });
//   }
// }
export const getAllAcceptedUsers = async (req, res) => {
  try {
    console.log(req.body, "request coming here");
    const requests = await creatingRequest.find({ senderId: req.body.userId });
    const sendingUserPromises = requests.map(async (data) => {
      if (data.senderId === req.body.userId) {
        const newId = new mongoose.Types.ObjectId(data.recieverId);
        const finalData = await registeringUser.findOne({ _id: newId });
        return finalData;
      }
    });

    const sendingUser = await Promise.all(sendingUserPromises);
    const filteredSendingUser = sendingUser.filter(
      (data) => data !== undefined
    );

    res.json({ message: "Success", status: 200, data:filteredSendingUser });
    console.log(filteredSendingUser, "=========> sending accepted Userssssss");
  } catch (err) {
    console.error("Server error:", err);
    res.json({ message: "Server Error", status: 500 });
  }
};
export const getSubscriptionByRecieverId = async (req, res) => {
  try {
    console.log(req.body, "calling");
    const subscribeUser = await creatingRequest
      .find({ recieverId: req.body.userId })
      .sort({ timestamp: -1 });
    console.log(subscribeUser, "now data 1");

    const sendingUserPromises = subscribeUser.map(async (data) => {
      const finalData = await registeringUser.findOne({ _id: data.senderId });
      return {
        userData: finalData,
        paymentData: data,
      };
    });

    const sendingUser = await Promise.all(sendingUserPromises);
    console.log(sendingUserPromises, "now data");

    res.json({ message: "Success", status: 200, data:sendingUser });
    console.log(sendingUser, "=======> sending accepted Userssss");
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};
// export const getAllSubscriptions = async (req, res) => {
//   try {
//     let subscribeUser;
//    let sendingUser = [];
//          await creatingRequest.find({}).sort({ timestamp: -1 }).then((data)=>{
//           if(data){
//            subscribeUser=data
//           }
//          })

//        subscribeUser?.map(async (datas, index) => {
//       // console.log(datas.recieverId, "index");

//         // const newId = new mongoose.Types.ObjectId(datas?.senderId);
//         await registeringUser.findOne({ _id: datas?.recieverId }).then((finalData) => {
//           sendingUser.push({
//           recieverData:finalData,
//           paymentData:datas});
//           console.log(finalData, "SendingUser====>");
//         });

//       {
//       // if (datas?.recieverId === req.body.userId) {
//       //   const newId = new mongoose.Types.ObjectId(datas?.senderId);
//       //   await registeringUser.findOne({ _id: newId }).then((finalData) => {
//       //     sendingUser.push(finalData);
//       //     console.log(finalData, "coming in this SendingUser====>");
//       //   });
//       // }
//     }
// if (subscribeUser.length === sendingUser.length) {
//         res.json(sendingUser);
//         console.log(sendingUser, "=========>sending accpeted User");
//       }

//     });

//     }
//     catch (err) {
//         res.json({message:"Server Error"});
//     }
// };

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscribeUser = await creatingRequest
      .find({})
      .sort({ timestamp: -1 });

    const sendingUserPromises = subscribeUser.map(async (datas) => {
      const finalData = await registeringUser.findOne({
        _id: datas.recieverId,
      });
      return {
        recieverData: finalData,
        paymentData: datas,
      };
    });

    const sendingUser = await Promise.all(sendingUserPromises);

    res.json({ message: "Success", status: 200, data:sendingUser });
    console.log(sendingUser, "=========> sending accepted User");
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};

export const updateNotiStatus = async (req, res) => {
  console.log(req.body, "==========>");
  try {
    console.log(req.body);
    creatingRequest
      .updateMany(
        { recieverId: req.body.userId },
        { $set: { notiStatus: false } }
      )
      .then((data) => {
        console.log(data);
        res.json({ message: "updated", status: 200 });
      })
      .catch((error) => {
        console.error("status not updated:", error);
        res.json({ message: "status not updated", status: 400 });
      });
  } catch (err) {
    // .then((data)=>{
    // if(data){

    //     res.json({ message: "request Generated"});
    // }
    // else{

    //    res.json({ message: "request not Generated"});
    // }
    // })
    res.json({ message: "Server Error", status: 500 });
  }
};
