import mongoose from 'mongoose'

const postPayment= new mongoose.Schema({
    recieverId: {
        type: String,
        
    },
    payerId: {
        type: String,
        
    },
    price: {
        type: Number,
        
        
    },
    postId:{
        type: String,
    },
    paymentId:{
        type: String,
    },
   timestamp: {
    type: Date,
    default: Date.now,
  },
    

    
    
})

const registeringPostPayment = mongoose.model('postPayment', postPayment)
export default registeringPostPayment;