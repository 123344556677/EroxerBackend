import registeringUser from "../Schemas/Auth.js";
import registeringCreator from "../Schemas/Creator.js";
export const ApplyForCreator = async (req, res) => {
    try {
        console.log(req.body)
       
       await registeringCreator.create(req.body)
        .then((data)=>{
            if (data) {
                console.log(data)
                res.json({ message: "applied" })
            }
            else {
                res.json({ message: "not applied" })
            }
        })
    }
     catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const getAllCreatorRequest=async(req,res)=>{
    try {
        const data = await registeringCreator.find({}).sort({ timestamp: -1 })
        res.json(data);
    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}
export const updateCreatorRequestStatus = async (req, res) => {
  console.log(req.body,"==========>");
  try {
        console.log(req.body)
        registeringCreator.findOneAndUpdate(
        { _id: req.body.id },
        {$set:{ status:req.body.status}},
        { upsert:true, new: true } 
        )
      .then((data) => {
        if(data){
          registeringUser.findOneAndUpdate(
        { _id: data.userId },
        {$set:{ creator:true}},
        { upsert:true, new: true } 
        ).then((datas) => {
        console.log('status updated');
         res.json({message:"updated"});
        })
        }
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