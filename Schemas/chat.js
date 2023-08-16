import mongoose from 'mongoose'

const chat = new mongoose.Schema({
    senderId: {
        type: String,
        required:true
        
    },
    recieverId: {
        type: String,
        required:true

    },
    message: {
        type: String,
        required:true

    },
    timestamp: {
    type: Date,
    default: Date.now,
  },
   readStatus: {
    type: Boolean,
    default:false,
    required:true
  },
  picReadStatus: {
    type: Boolean,
    default:false,
    required:true
  }
   
    
   
    
    
    
})

const creatingChat = mongoose.model('chat',chat )
export default creatingChat;