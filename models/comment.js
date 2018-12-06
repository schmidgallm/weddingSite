// Dependencies
const mongoose = require('mongoose');

// Save ref to to schema constructor
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        validate: [
            (input) => {
                return input.length >= 1;
            }
        ],
        required: true
    },
    comment: {
        type: String
    }
});

const Comment = mongoose.model('commentsubmit', CommentSchema);

module.exports = Comment;