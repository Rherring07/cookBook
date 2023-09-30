const express = require('express')
const colors = require('colors');
//passport for authentication
const passport = require('passport')
//stores sessions so we can keep track when someone is logged in
const mongoose = require("mongoose"); //
const session = require("express-session");
const MongoStore = require('connect-mongo');
//connect database
const connectDB = require("./server/config/db");
//notifications for validation (email is being used, etc)
const flash = require("express-flash");
//logger
const logger = require("morgan");
// Routes 
const recipeRoutes = require('./server/routes/recipes')
const mainRoutes = require('./server/routes/main')
// Running build
const path = require('path')


// Create express app
const app = express();


//Port
const port = process.env.PORT || 5000;

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Cyclic Hosting Frontend and Backend
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logging
app.use(logger("dev"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
      secret: "secretkey",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
          client: mongoose.connection.getClient()
      }),
      unset: 'destroy'      
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport config
require("./server/config/passport")(passport);

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use('/api', mainRoutes);
app.use('/api/recipes', recipeRoutes);

//Connect to DB before Server Running
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${port}`);
    });
})
  
