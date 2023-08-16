import mongoose from 'mongoose'

const tip= new mongoose.Schema({
    senderData: {
        type: Object,
        required:true
        
    },
    recieverId: {
        type: String,
        required:true
        
    },
    tip: {
        type: Number,
        required:true

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

const creatingTip = mongoose.model('tip',tip )
export default creatingTip;