import mongoose from 'mongoose'

const request = new mongoose.Schema({
    senderId: {
        type: String,
        required:true
        
    },
    userData: {
        type: Object,
        required:true
        
    },
    recieverId: {
        type: String,
         required:true

    },
    payment: {
        type:Number,
        

    },
    paymentId: {
        type: String,
        required:true
        
    },
    
    timestamp: {
    type: Date,
    default: Date.now,
  },
  notiStatus: {
    type: Boolean,
    default: true,
  },
   
    
   
    
    
    
})

const creatingRequest = mongoose.model('request',request )
export default creatingRequest;