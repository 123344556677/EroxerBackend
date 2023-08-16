import mongoose from 'mongoose'

const ad = new mongoose.Schema({
    userId: {
        type: String,
        required:true
        
    },
    date: {
        type: Date,
        required:true

    },
   
    time: {
        type: String,
        required:true
        
    },
    adPic: {
        type: String,
        required:true
        
    },
    availableFor: {
        type: String,
        required:true
        
    },
    meetingType: {
        type: String,
        required:true
        
    },
    description: {
        type: String,
        required:true
        
    },
    userData:{
        type: Object,
    },
    adress: {
        type: String,
        required:true
        
    },
    country: {
        type: String,
        required:true
        
    },
    city: {
        type: String,
        required:true
        
    },
    gender: {
        type: String,
        required:true
        
    },
    age: {
        type: Number,
        required:true
        
    },
    province: {
        type: String,
        required:true
        
    },
    counter: {
        type: Number,
        
        
    },
    
    
})

const creatingAd = mongoose.model('ad',ad )
export default creatingAd;