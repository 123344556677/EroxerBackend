import mongoose from 'mongoose'

const list = new mongoose.Schema({
    userId: {
        type: String,
        required:true
        
    },
    
    otherData: {
        type:Object

    },

   
    
   
    
    
    
})

const creatingList = mongoose.model('list',list )
export default creatingList;