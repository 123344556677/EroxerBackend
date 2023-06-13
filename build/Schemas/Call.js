import mongoose from 'mongoose'

const call = new mongoose.Schema({
    roomId: {
        type: String,
        required:true
        
    },
    senderId: {
        type: String,
         required:true

    },
    status: {
        type: String,
        default:"pending"

    },
    timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
        type: String,

    },
   
   
    
   
    
    
    
})

const creatingCall = mongoose.model('call',call )
export default creatingCall;