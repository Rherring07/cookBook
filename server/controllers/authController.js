const passport = require("passport");
const validator = require("validator");
const User = require("../models/UserModel");


// Get Login
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user);
  }

    return res.status(201);
 
};

// Post Login
exports.postLogin = (req, res, next) => {

    // Validator - used to check for email and blank password
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
        validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
        return res.status(400).send(validationErrors)
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });

    // Uses Passport Local Strategy to Authenticate Users
    passport.authenticate("local", (err, user, info) => {
        if (err) {
        console.log('error1')
            return next(err);
        }
        if (!user) {
            console.log('user error')
            console.log([info])
            return res.status(400).send([info])
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log('error3')
            }
            
            return res.status(200).json(
                { userName: user.userName, 
                  bookmarkedRecipes: (user.bookmarkedRecipes || []), likedRecipes: (user.likedRecipes  || [])
                });
        });
    })(req, res, next);
},

exports.getMe = async (req, res) => {
    try {
        const me = await req.user
        res.status(200).json(me);
    } catch {
        console.log('Cannot Find Me.')
        console.log('User id is ' + req.params.id)
        console.log(req.params)
    }
},

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.params.userName })
        res.status(200).json({userName: user.userName})
    } catch {
        console.log('Cannot Find User.')
        console.log('User id is ' + req.params.id)
        console.log(req.params)
    }
},

exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
    });
    req.session = null;
    res.clearCookie('connect.sid');
    res.status(200).send(req.user);
  };


// Post Sign Up
exports.postSignup = async (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({
        msg: "Password must be at least 8 characters long",
        });
    if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({ msg: "Passwords do not match" });

    if (validationErrors.length) {
        return res.status(400).send(validationErrors)
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });

    User.findOne(
        { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
        async (err, existingUser) => {
        if (err) {
            return res.status(400)
        }
        if (existingUser) {
            const msg = {msg : "Account with that email address or username already exists."}
            console.log(msg)
            return res.status(400).send([msg]);
        }
        const user =  await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });
        
            user.save((err) => {
                if (err) {
                    return next(err, "error1");
                }
                req.logIn(user, (err) => {
                if (err) {
                    return next(err, "error2");
                }
                console.log('User Saved')
                res.status(200).json({ userName: user.userName, id: user._id });
                });
            });
        }
    );
};
  