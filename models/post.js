const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    postData : {
        type : String,
        required : true
    },
    commentId : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'commentData'
        }
    ]
});
const postData = mongoose.model('posts',postSchema);
module.exports = postData;