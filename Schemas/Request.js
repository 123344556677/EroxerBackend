import mongoose from 'mongoose'

const request = new mongoose.Schema({
    senderId: {
        type: String,
        required:true
        
    },
    recieverId: {
        type: String,
         required:true

    },
    status: {
        type: String,

    },
    timestamp: {
    type: Date,
    default: Date.now,
  },
   
    
   
    
    
    
})

const creatingRequest = mongoose.model('request',request )
export default creatingRequest;