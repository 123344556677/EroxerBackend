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
        type: Boolean,
        required:true,
        default:false
        
    },
    
    timestamp: {
    type: Date,
    default: Date.now,
  },
  
   
    
   
    
    
    
})

const creatingPaymentRequest = mongoose.model('paymentRequest',paymentRequest )
export default creatingPaymentRequest;