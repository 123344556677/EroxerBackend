import creatingPost from '../Schemas/Post.js';
// import multer from 'multer'

// const storage = multer.diskStorage({
//   destination:"posts", 
//   filename:(req,file,cb)=>{
//     cb(null,file.originalname)
//   }

    
//   })
//   const post = multer({ Storage: storage }).single("postPic")

export const createPost = async (req, res) => {
    
    try {
        
        
         console.log(req.body)
      
    
    //     await creatingPost.create({
    //         userId:req.body.userId,
    //         postPic:{
    //         data:req.body.postPic,
    //         contentType:"image/png"},
    //   postCheck:req.body.postCheck,
    //   commentsCheck:req.body.commentsCheck,
    //   price:req.body.price,
    //   postProfilePic:req.body.postProfilePic

    //     })
    //         .then((data)=>{
    //         if(data){
            
    //             res.json({ message: "post Generated"});
    //         }
    //         else{
               
    //            res.json({ message: "post not Generated"});
    //         }
    //         })
             await creatingPost.create(req.body)
            .then((data)=>{
            if(data){
            
                res.json({ message: "post Generated"});
                console.log(data)
            }
            else{
               
               res.json({ message: "post not Generated"});
            }
            })
        
        
    }
    catch (err) {
        console.log("error in creating post", err);
        res.status(404).json({message:"sever error"})
    }
}
export const getAllPosts=async(req,res)=>{
    try {
        const data = await creatingPost.find({})
        res.json(data);
    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}
export const pollCounterIncrement = async (req, res) => {
    
    try {
        
        
        
         console.log(req.body)
      const { objectId, objectContainingCounterId, counterValue, userId } = req.body;
      console.log( objectId,
         objectContainingCounterId,
          counterValue, 
          userId)
    
   
    await creatingPost.findOneAndUpdate(
  { _id: objectId, 'options._id': objectContainingCounterId },
  {
    $inc: { 'options.$.counter': 1 },
    $push: {  userPollId: userId }
  },
  { new: true }
)
  .then((updatedObject) => {
    console.log(updatedObject,"--------->object data")
  })
  .catch((error) => {
    // Handle the error
  });
        
        
    }
    catch (err) {
        console.log("error in creating post", err);
        res.status(404).json({message:"sever error"})
    }
}