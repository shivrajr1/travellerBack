const ExpressError=require('../utils/ExpressError')
module.exports.islogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next(new ExpressError(403,"you have to login"))
    }
    next();
  }