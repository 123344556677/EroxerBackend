import creatingContact from "../Schemas/Contact.js";
import registeringUser from "../Schemas/Auth.js";
import mongoose from "mongoose";

export const createContact = async (req, res) => {
  try {
    console.log(req.body);

    await creatingContact.create(req.body).then((data) => {
      if (data) {
        res.json({ message: "contact Generated", status: 200 });
        console.log(data);
      } else {
        res.json({ message: "conact not Generated", status: 400 });
      }
    });
  } catch (err) {
    console.log("error in creating post", err);
    res.status(404).json({ message: "server error", status: 500 });
  }
};
// export const getContactById= async (req, res) => {

//     let subscribeUser;
//    let sendingUser = [];
//   console.log(req.body,"==========> coming here");
//   try {
//     await creatingContact.find({$or: [
//     { contactorId:req.body.userId },
//     { recieverId:req.body.userId }
//   ]}).sort({ timestamp: -1 }).then((data) => {
//       if (data) {
//         // res.json(data);
//         subscribeUser=data
//         console.log(data,"==========> coming here 2");
//         // res.json({ message: "request Generated"});
//       } else {
//         res.json({ message: "request not Generated" });
//       }
//     });
//    subscribeUser?.map(async (datas, index) => {
//       // console.log(datas.recieverId, "index");

//         // const newId = new mongoose.Types.ObjectId(datas?.senderId);
//         if(datas.contactorId===req.body.userId){
//         await registeringUser.findOne({ _id: datas?.recieverId }).then((finalData) => {
//           sendingUser.push(finalData);
//           console.log(finalData, "SendingUser====>");
//         });
//     }
//         if(datas.recieverId===req.body.userId){
//         await registeringUser.findOne({ _id: datas?.contactorId }).then((finalData) => {
//           sendingUser.push(finalData);
//           console.log(finalData, "SendingUser====>");
//         });
//     }

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
export const getContactById = async (req, res) => {
  try {
    const subscribeUser = await creatingContact
      .find({
        $or: [
          { contactorId: req.body.userId },
          { recieverId: req.body.userId },
        ],
      })
      .sort({ timestamp: -1 });
    console.log(subscribeUser, "=========> accepted User");

    const sendingUserPromises = subscribeUser.map(async (data) => {
      let userId;
      let newId;
      if (data.contactorId === req.body.userId) {
        userId = data.recieverId;
        newId = new mongoose.Types.ObjectId(userId);
      } else if (data.recieverId === req.body.userId) {
        userId = data.contactorId;
        newId = new mongoose.Types.ObjectId(userId);
      }
      console.log(userId);

      try {
        const finalData = await registeringUser.findOne({ _id: userId });
        console.log(finalData, "=========> sending accepted User");
        return finalData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    console.log(sendingUserPromises, "=========> sending accepted User");

    const sendingUser = await Promise.all(sendingUserPromises);
    console.log(sendingUser);

    res.json({ message: "Success", status: 200, data:sendingUser });
  } catch (err) {
    res.json({ message: "Server Error", status: 500 });
  }
};
