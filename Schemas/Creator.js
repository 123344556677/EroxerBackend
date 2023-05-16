import mongoose from 'mongoose'

const creator = new mongoose.Schema({
    userId: {
        type: String,
        
    },
    videoUrl: {
        type: String,
        
    },
    status: {
        type: String,
        default:"pending"
        
    },
   
    

    
    
})

const registeringCreator = mongoose.model('creator', creator)
export default registeringCreator;