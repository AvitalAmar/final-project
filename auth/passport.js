const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
//Load model
const User = require("../models/user");

const loginCheck = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
      //Check customer
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log("wrong email");
            return done(null, false, req.flash("loginMessage", "Wrong email"));            
          }
          //Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              return done(null, false, req.flash("loginMessage", "Wrong password"));
            }
          });
        })
        .catch((error, done) => {
            console.log(error);
            return done(null, false, req.flash("loginMessage", error));
        });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {   
    try {
        const current_user = await User.findById(id);
        if (!current_user) return done(null, false);
        done(null, current_user);
    }
    catch (e) {
        done(e)
    }
  });
};
module.exports = {
  loginCheck,
};