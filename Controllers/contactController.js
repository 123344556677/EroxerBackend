import creatingContact from "../Schemas/Contact.js";
import registeringUser from "../Schemas/Auth.js";

export const createContact = async (req, res) => {
    
    try {
        
        
         console.log(req.body)
      
    
    
             await creatingContact.create(req.body)
            .then((data)=>{
            if(data){
            
                res.json({ message: "contact Generated"});
                console.log(data)
            }
            else{
               
               res.json({ message: "conact not Generated"});
            }
            })
        
        
    }
    catch (err) {
        console.log("error in creating post", err);
        res.status(404).json({message:"sever error"})
    }
}
export const getContactById= async (req, res) => {
    
    let subscribeUser;
   let sendingUser = [];
  console.log(req.body,"==========> coming here");
  try {
    await creatingContact.find({$or: [
    { contactorId:req.body.userId },
    { recieverId:req.body.userId }
  ]}).sort({ timestamp: -1 }).then((data) => {
      if (data) {
        // res.json(data);
        subscribeUser=data
        console.log(data,"==========> coming here 2");
        // res.json({ message: "request Generated"});
      } else {
        res.json({ message: "request not Generated" });
      }
    });
   subscribeUser?.map(async (datas, index) => {
      // console.log(datas.recieverId, "index");
      
        // const newId = new mongoose.Types.ObjectId(datas?.senderId);
        if(datas.contactorId===req.body.userId){
        await registeringUser.findOne({ _id: datas?.recieverId }).then((finalData) => {
          sendingUser.push(finalData);
          console.log(finalData, "SendingUser====>");
        });
    }
        if(datas.recieverId===req.body.userId){
        await registeringUser.findOne({ _id: datas?.contactorId }).then((finalData) => {
          sendingUser.push(finalData);
          console.log(finalData, "SendingUser====>");
        });
    }
      
      {
      // if (datas?.recieverId === req.body.userId) {
      //   const newId = new mongoose.Types.ObjectId(datas?.senderId);
      //   await registeringUser.findOne({ _id: newId }).then((finalData) => {
      //     sendingUser.push(finalData);
      //     console.log(finalData, "coming in this SendingUser====>");
      //   });
      // }
    }
if (subscribeUser.length === sendingUser.length) {
        res.json(sendingUser);
        console.log(sendingUser, "=========>sending accpeted User");
      }
      
    });
  } catch (err) {
    res.json({ message: "Server Error" });
  }
   
}