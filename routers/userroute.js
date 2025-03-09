const router = require("express").Router();
const {LoginFailed,Login,Logout,Signup}=require('../controlers/User');
const {islogin}=require('../middlewares/isLogin');
const passport = require("passport");

router.route("/login")
  .get(LoginFailed)
  .post(passport.authenticate('local',{ failureRedirect: "/login" })
      ,Login)

router.route("/logout")
  .delete(islogin,Logout)

router.route('/signup')
  .post(Signup)

module.exports = router;