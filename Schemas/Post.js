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
    }
   
    
    
    
})

const creatingPost = mongoose.model('post',post )
export default creatingPost;