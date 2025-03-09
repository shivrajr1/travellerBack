const wrapasync=require('../utils/wrapasync');
const Review=require('../modules/reviews');
const ExpressError=require('../utils/ExpressError')

module.exports.isReviewAuthor=wrapasync(async(req,res,next)=>{
    let {reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(`${req.user._id}`!=`${review.owner}`){
      next(new ExpressError(403,"unotherised"))
    }
    next();
  })