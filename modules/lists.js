const mongoose=require('mongoose');
const Review=require('./reviews');
const { required } = require('joi');
const listShcema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    img:{
        filename:String,
        url:String,
    },
    price:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date ,
        default:Date.now(),
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    },],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address:{
        type:String,
        required:true,
    }
})

listShcema.post('findOneAndDelete',async(list,next)=>{
    await Review.deleteMany({_id:{$in:list.reviews}})
    next();
})
module.exports=mongoose.model('List',listShcema);