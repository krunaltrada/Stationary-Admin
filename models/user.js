const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    avatar:{
        type : String
    }
});

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now());
    }
});

userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model('user',userSchema);
module.exports = user;