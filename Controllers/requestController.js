import registeringUser from '../Schemas/Auth.js';
import creatingRequest from '../Schemas/Request.js';
import mongoose from 'mongoose';

export const sendRequest=async(req,res)=>{
   
    console.log(req.body);
    try {
   await creatingRequest.create(req.body)
            .then((data)=>{
            if(data){
            
                res.json({ message: "request Generated"});
            }
            else{
               
               res.json({ message: "request not Generated"});
            }
            })

    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}

export const getRequestById=async(req,res)=>{
let requests=[];
let sendingUser=[];
    console.log(req.body);
    try {
   await creatingRequest.find({$and: [
    { recieverId:req.body.userId  }, 
    { status:"pending" },
  ],})
            .then((data)=>{
            if(data){
                
              requests.push(data);
                // res.json({ message: "request Generated"});
            }
            
            else{
               
               res.json({ message: "request not Generated"});
            }
            })
//  console.log( requests,"after initial")
            requests?.map(async(datas,index)=>{
                
                const newId=new mongoose.Types.ObjectId(datas[index]?.senderId)
               
                

                await registeringUser.find({_id:newId})
                 .then((finalData)=>{
                     
                    sendingUser.push(finalData)
                    console.log(sendingUser,"SendingUser====>")
                 })
                  if (requests.length === sendingUser.length) {
          res.json(sendingUser);
        }


            })
        

            

    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}