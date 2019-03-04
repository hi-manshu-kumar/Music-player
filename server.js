require('dotenv').config();

//required dependency
const _ = require('lodash');
const express = require("express");
const path = require('path');
const {ObjectID} = require('mongodb');
const morgan = require('morgan');
const favicon = require('serve-favicon');

// required files
const route = require("./routes/route");
const Post = require('./models/post');
const User = require('./models/user');
const postRoute = require("./routes/post");
const userRoute = require('./routes/user');

// create mongo connection
const {mongoose} = require("./db/mongoose");

const app = express();
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// cross-origin
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Methods", "POST, PUT, GET", "DELETE");
//     next();
// });

// views configure
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static file config
app.use(express.static(path.join(__dirname, 'public')));

// routes

// @route GET /
// @desc Loads index page
app.use("/", route);

// @route GET /post
// @desc Loads routes from userRoute
app.use("/post", postRoute);

// @route GET /user
// @desc Loads routes from userRoute
app.use("/user", userRoute);

app.use(function (req, res){
    res.status(400).send("Oops somehting wrong in url");
});

app.listen(process.env.PORT, () =>{
    console.log(`--connection open--`);
    console.log(`server running on ${process.env.PORT}`);
});

