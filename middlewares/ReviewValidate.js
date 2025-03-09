const {reviewValidation}=require('../utils/ListreviewValidation');
const ExpressError=require('../utils/ExpressError');
module.exports.reviewValidate=(req,res,next)=>{
    let {error}=reviewValidation.validate(req.body);
    if(error){
       next(new ExpressError(403,error.message))
    }
    next();
  }