import creatingPost from '../Schemas/Post.js';
export const createPost = async (req, res) => {
    try {
        
        
        console.log(req.body)
    
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