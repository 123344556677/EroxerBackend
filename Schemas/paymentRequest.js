import mongoose from 'mongoose'

const paymentRequest= new mongoose.Schema({
    userData: {
        type: Object,
       
        
    },
    userId: {
        type: String,
        required:true
        
    },
    payment: {
        type: Number,
        required:true
        
    },
    status: {
        type: String,
        required:true,
        default:"pending"
        
    },
    
    timestamp: {
    type: Date,
    default: Date.now,
  },
  
   
    
   
    
    
    
})

const creatingPaymentRequest = mongoose.model('paymentRequest',paymentRequest )
export default creatingPaymentRequest;