import creatingPost from '../Schemas/Post.js';
export const CreatePoll = async (req, res) => {
    try {
        
        
        console.log(req.body)
    
        await creatingPost.create(req.body)
            .then((data)=>{
            if(data){
                
                res.json({ message: "ad Generated"});
                console.log(data)
            }
            else{
               
               res.json({ message: "ad not Generated"});
            }
            })
        
        
    }
    catch (err) {
        console.log("error in creating ad", err);
        res.status(404).json({message:"sever error"})
    }
}