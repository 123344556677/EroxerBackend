import mongoose from 'mongoose'

const reg = new mongoose.Schema({
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,

    },
   
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
   
    username: {
    type: String,
    },
    profilePic: {
    type: String,
    },
    website: {
    type: String,
    },
    phoneNumber: {
    type: Number,
    },
    Gender: {
    type: String,
    },
    profileName: {
    type: String,
    },
    profileEmail: {
    type: String,
    },
    about: {
    type: String,
    },
    backgroundImage:{
    type: String,
    },
    cnicValidation:{
        type:Boolean
    },
    cnicFront:{
        type:String
    },
    cnicBack:{
        type:String
    },
    onlineStatus:{
        type:Boolean
    },
    

    
    
})

const registeringUser = mongoose.model('user', reg)
export default registeringUser;