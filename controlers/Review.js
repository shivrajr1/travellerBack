const wrapasync=require('../utils/wrapasync');
const List=require('../modules/lists');
const Review=require('../modules/reviews');


module.exports.NewReview=wrapasync(async(req,res)=>{
        const list =await List.findById(req.params.id);
        const review=new Review({...req.body,owner:req.user._id});
        list.reviews.push(review);
        await review.save();
        await list.save();
        res.status(200).send("success");
})

module.exports.DeleteReview=wrapasync(async(req,res)=>{
    let {id,reviewId}=req.params;
   await List.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.status(200).send("deleted");
  })