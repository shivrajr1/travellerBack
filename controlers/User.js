const User = require("../modules/users");
const wrapasync = require('../utils/wrapasync');

module.exports.LoginFailed=(req, res) => {
    res.status(200).send("login failed");
  }

module.exports.Login=(req, res) => {
    res.status(200).json({
      id: req.user._id
    });
  }

module.exports.Logout=(req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.status(200).send("loged out");
    });
  }

module.exports.Signup=wrapasync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username })
      await User.register(newUser, password);
      req.login(newUser, function (err) {
        if (err) { return next(err); }
        return res.status(200).json({
          id: req.user._id
        });
      });
    } catch (e) {
      res.status(200).send("failed registration");
    }
  })