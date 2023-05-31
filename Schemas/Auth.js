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
    profileWishlist:[
        {
            type:String
        }
    ],
    verifyStatus:{
        type:Boolean,
        default:false

    },
    liveStreamStatus:{
        type:String,
        default:"false"

    }
    

    
    
})

const registeringUser = mongoose.model('user', reg)
export default registeringUser;