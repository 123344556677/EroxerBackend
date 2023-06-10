import mongoose from 'mongoose'

const post = new mongoose.Schema({
    userId: {
        type: String,
        required:true
        
    },
    // postPic: {
    //     data:Buffer,
    //     contentType:String

    // },
    postPic: {
        type:String

    },

   
    postCheck: {
        type: Boolean,
        
    },
    commentsCheck: {
        type: Boolean,
        
    },
     price: {
        type: Number,
        
    },
    postProfilePic:{
         type: String,
    },
    userData:{
        type: Object,
    },
   question: {
        type:String

    },

   
    options:[
        {
       value: {
            type:String
        },
        counter: {
            type:Number
        }
    }
    ],
    key:{
        type:String
    },
    userPollId:[
        {
        type:String
        }
    ],
    timestamp: {
    type: Date,
    default: Date.now,
  },
    
    
    
})

const creatingPost = mongoose.model('post',post )
export default creatingPost;