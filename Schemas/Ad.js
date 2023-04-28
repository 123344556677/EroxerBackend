import mongoose from 'mongoose'

const ad = new mongoose.Schema({
    userId: {
        type: String,
        required:true
        
    },
    date: {
        type: Date,

    },
   
    time: {
        type: String,
        
    },
    adPic: {
        type: String,
        
    },
    availableFor: {
        type: String,
        
    },
    meetingType: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    userData:{
        type: Object,
    }
    
    
    
})

const creatingAd = mongoose.model('ad',ad )
export default creatingAd;