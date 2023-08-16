import mongoose from 'mongoose'

const postPayment= new mongoose.Schema({
    recieverId: {
        type: String,
        required:true
        
    },
    payerId: {
        type: String,
        required:true
        
    },
    price: {
        type: Number,
        required:true
        
        
    },
    postId:{
        type: String,
        required:true
    },
    paymentId:{
        type: String,
        required:true
    },
   timestamp: {
    type: Date,
    default: Date.now,
  },
    

    
    
})

const registeringPostPayment = mongoose.model('postPayment', postPayment)
export default registeringPostPayment;