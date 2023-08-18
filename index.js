const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
const path = require('path');

const app = express();

dotenv.config();
loginCheck(passport);

// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('e don connect'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');

//BodyParsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
app.use('/', require('./routes/routes'));

app.use(express.static(path.join(__dirname, 'public')));

//socket.io
const PORT = process.env.PORT || 4111;
const server = app.listen(PORT, console.log("Server has started at port " + PORT));
const io = require('socket.io')(server, { allowEIO3: true, });
io.on('connection', socket => {
  socket.on('new purchase', ( purchase ) => {
    io.emit('new purchase', purchase)
  });
});





