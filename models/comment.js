const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    commentData : {
        type : String,
        required : true
    },
    postid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'postData',
    }
});
const commentData = mongoose.model('comments',commentSchema);
module.exports = commentData;