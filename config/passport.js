// passport.js
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// 載入 User model
const User = require("../models/user");
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }
        if (user.password != password) {
          return done(null, false, { message: "Email or Password incorrect" });
        }
        return done(null, user);
      });
    })
  );
  passport.serializeUser((user, done) => {
    //支援 session 功能
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
