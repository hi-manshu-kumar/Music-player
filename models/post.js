const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true
        default: null
    },
    path: {
        type: String,
        required: true
    },
    communityFlag: {
        type: Boolean,
        default: false
    }
});

var Post = mongoose.model('Post', postSchema);

module.exports = {Post}