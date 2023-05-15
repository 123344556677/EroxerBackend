import creatingList from "../Schemas/list.js";
import registeringUser from "../Schemas/Auth.js";
import mongoose from "mongoose";

export const addToList = async (req, res) => {
  try {
    console.log(req.body, "list data");
    const otherId = req.body.otherId;
    const userId = req.body.userId;

    // const newId = new mongoose.Types.ObjectId(otherId);
    registeringUser.findOne({ _id: otherId }).then(async (data) => {
      if (data) {
         const newId = new mongoose.Types.ObjectId(otherId);
        creatingList.findOne({ 'otherData._id': newId })
          .then(async (datas) => {
            if (datas) {
                console.log(datas,"came in it")
              res.json({ message: "user already added" });
            } else {
              await creatingList
                .create({
                  userId: userId,
                  otherData: data,
                })
                .then((data) => {
                  console.log(data, "userAdded");
                  res.json({ message: "user added" });
                });
            }
          });
      } else {
        res.json({ message: "user not found" })
      }
    });
  } catch (err) {
    console.log("error in creating ad", err);
    res.status(404).json({ message: "sever error" });
  }
};

export const getAllListById = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await creatingList.find({ userId: userId });
    res.json(data);
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};
export const deleteListDataById = async (req, res) => {
  try {
    console.log(req.body,"calling this------>")
    const id = req.body.listDataId;
    await creatingList.findByIdAndRemove(id)
    .then((data)=>{
        if(data){
       
        res.json({message:"Data deleted"})
        }
        else{
        res.json({message:"not found"})
        }
        

    })
  
  } catch (err) {
    res.json({ message: "Server Error" });
  }
};
