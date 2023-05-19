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
    },
    adress: {
        type: String,
        
    },
    country: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    gender: {
        type: String,
        
    },
    age: {
        type: Number,
        
    },
    province: {
        type: String,
        
    },
    counter: {
        type: Number,
        
    },
    
    
})

const creatingAd = mongoose.model('ad',ad )
export default creatingAd;