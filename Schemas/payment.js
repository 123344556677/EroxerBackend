import mongoose from 'mongoose'

const payment= new mongoose.Schema({
    userId: {
        type: String,
        required:true
        
    },
    paymentId: {
        type: String,
        required:true
        
    },
    name: {
        type: String,

    },
    email: {
        type: String,

    },
    country: {
        type: String,

    },
    postalCode: {
        type: String,

    },
    state: {
        type: String,

    },
    timestamp: {
    type: Date,
    default: Date.now,
  },
  
   
    
   
    
    
    
})

const creatingPayment = mongoose.model('payment',payment )
export default creatingPayment;