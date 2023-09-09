import mongoose from 'mongoose'

const token= new mongoose.Schema({
    userId: {
        type: String,
        required:true
        
    },
    token: {
        type: String,
    },  
    
})

const firebaseToken = mongoose.model('token', token)
export default firebaseToken;