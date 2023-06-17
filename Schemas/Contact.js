import mongoose from 'mongoose'

const contact = new mongoose.Schema({
    contactorId: {
        type: String,
        required:true
        
    },
    
    recieverId: {
        type: String,
         required:true

    },
   
    
    timestamp: {
    type: Date,
    default: Date.now,
  },
  
   
    
   
    
    
    
})

const creatingContact = mongoose.model('contact',contact )
export default creatingContact;