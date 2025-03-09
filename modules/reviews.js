const { required, date } = require("joi");
const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
   })

   module.exports=mongoose.model('Review',reviewSchema);