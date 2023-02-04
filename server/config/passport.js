// Auth shenanigans using passport

const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/UserModel");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("Email not found");
          return done(null, false, { msg: `Email not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, { userName: user.userName, bookmarkedRecipes: (user.bookmarkedRecipes || []), likedRecipes: (user.likedRecipes  || [])});
    });
  });
};
