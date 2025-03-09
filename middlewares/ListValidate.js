const {listValidation}=require('../utils/ListreviewValidation');
const ExpressError=require('../utils/ExpressError')
module.exports.listValidate=(req,res,next)=>{
  let {error}=listValidation.validate(req.body);
  if(error){
     next(new ExpressError(403,error.message))
  }
  next();
}