const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {authenticate} = require('../middleware/authenticate');
const {Post} = require("../models/post");
const {ObjectID} = require('mongodb');

// @route POST /post
// @desc add image
router.post('/', authenticate, (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            res.status(400).send( err);
        } else {
            if (req.file == undefined) {
                res.status(400).send("Error: No File Selected!");
            } else {
                
                var fullPath = "files/" + req.file.filename;
                let flag = req.body.communityFlag == undefined ? false: true;
                var post = new Post({
                    title: req.body.title,
                    path: fullPath,
                    description: req.body.description,
                    _creator: req.user._id,
                    communityFlag: flag
                });

                post.save().then((data) => {
                    res.send(data);

                }, (err) => {
                    res.status(400).send(err);
                })
            }
        }
    });
});

// @route GET /post
// @desc Loads all post from community
router.get('/', authenticate, (req, res) => {
    Post.find({
        // _creator: req.user.id
        communityFlag: true
    }).then((posts) => {
        res.status(200).send({
            posts
        });
    }, (err) => {
        res.status(400).send(err);
    })
});

// @route GET /post/123
// @desc load 1 post
router.get('/:id',  (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("id not valid")
    }

    Post.findOne({
        _id: id
        // _creator: req.user._id
    }).then((data) => {
        if (!data) {
            res.status(400).send("no id found");
        }
        res.status(200).send({
            data
        });
    }).catch((e) => {
        res.status(400).send();
    });
})

// @route DELETE /posts/id
// @desc delete 1 post
// router.delete('/:id', authenticate, (req, res) => {
//     var id = req.params.id;

//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send("send valid id");
//     }

//     Post.findOneAndRemove({
//         _id: id,
//         _creator: req.user._id
//     }).then((result) => {
//         if (!result) {
//             return res.status(404).send("no post found");
//         }
//         res.send({
//             result
//         });
//     }).catch((e) => {
//         res.status(400).send("err in connecting", e);
//     })
// });

module.exports = router;