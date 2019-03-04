const express = require("express");
const router = express.Router();
const {User} = require('../models/user');
const {authenticate} = require('../middleware/authenticate');
const _ = require('lodash');

// @route POST /user
// @desc add new user (signup)
router.post("/", (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then((data) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e.errors.email.message);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// @route GET /user/me
// @desc Load the user 
router.get('/me', authenticate, (req,res) => {
    // res.send(req.user);      
    res.send("login successfull"); 
});

// @route POST /user/login          
// @desc login using email and password     {email, password}
router.post('/login', (req, res) => {
    // var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(req.body.email, req.body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch( (e) => {
        res.status(400).send(`error occured during login`);
    });
})

// @route GET /postroute
// @desc Loads all
router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });  
});

module.exports = router;