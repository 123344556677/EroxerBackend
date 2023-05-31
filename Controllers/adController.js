import creatingAd from '../Schemas/Ad.js';
export const createAd = async (req, res) => {
    try {
        
        
        console.log(req.body)
    
        await creatingAd.create(req.body)
            .then((data)=>{
            if(data){
                
                res.json({ message: "ad Generated"});
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
export const getAllAds=async(req,res)=>{
    try {
        const data = await creatingAd.find({})
        res.json(data);
    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}
export const getAdsById = async (req, res) => {
    try{
        console.log(req.body)
     const { id } = req.params;
    
    
await creatingAd.findOne({_id:id})
.then((data)=>{
if(data){
    res.json({ message: "Ad Exist", data: data })
}
else{
    res.json({ message: "Ad not  Exist", data: data })
}
    
})
    }
catch(err){
        res.json({ message: "Server Error" });
}
       
};
export const AdCounterIncrement = async (req, res) => {
    try{
        console.log(req.body,"-------->id")
        // const newId = new mongoose.Types.ObjectId(req.body.id);
        await creatingAd.findOneAndUpdate(
   {_id:req.body.id},
  { $inc: { counter: 1 } }, // Increment the 'age' field by 1
  { upsert:true, new: true } // Return the updated document
)
  .then(data => {
    console.log(data)
    console.log({message:"incremented"});
  })
  .catch(error => {
    console.error({message:"not incremented",err:error});
  });
  
    }
catch(err){
        res.json({ message: "Server Error" });
}
       
};


