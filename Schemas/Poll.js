import mongoose from 'mongoose'

const poll = new mongoose.Schema({
    userId: {
        type: String,
        required:true
        
    },
    // postPic: {
    //     data:Buffer,
    //     contentType:String

    // },
    question: {
        type:String

    },

   
    options:[
        {
       value: {
            type:String
        }
    }
    ],
    userData: {
        type:Object

    },
   
    
    
    
})

const creatingPoll = mongoose.model('poll',poll )
export default creatingPoll;