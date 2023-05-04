import creatingPost from '../Schemas/Post.js';
import multer from 'multer'

const storage = multer.diskStorage({
  destination:"posts", 
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }

    
  })
  const post = multer({ Storage: storage }).single("postPic")

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