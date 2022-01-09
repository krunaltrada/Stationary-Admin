const { json } = require('express/lib/response');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const newComment = require('../views/mailers/comment_mailer');
const post = require('../models/post');
const comment = require('../models/comment');

module.exports.register = (req,res)=>{
    return res.render('register');
}
module.exports.registerUser = (req,res)=>{
    if(req.body.password == req.body.cpassword){
        user.uploadedAvatar(req,res,(err)=>{
            if(err){
                console.log("Wrong Data..!!");
            }
            var avatar = user.avatarPath + "/" + req.file.filename;
            user.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                avatar : avatar
            },(err,user)=>{
                if(err){
                    // console.log("Data Not Inserted..!!");
                    // return false;
                    req.flash('error',"Something Wrong..!!");
                    return res.redirect('back');
                }
                req.flash('success',"Register Successfully");
                return res.redirect('back');
            });
        });
    }
    else{
        return res.redirect('back');
    }
}

module.exports.login = (req,res)=>{
    if(req.isAuthenticated()){
        req.flash('error',"LogOut Required");
        return res.redirect('/dashboard');
    }
    return res.render('login');
}
module.exports.loginUser = (req,res)=>{
    if(req.isAuthenticated()){
        req.flash('success',"LogIn Successfully");
        return res.redirect('/dashboard');
    }
    // req.flash('success',"LogOut Required");
    return res.redirect('back');
}

module.exports.dashboard = (req,res)=>{
    return res.render('dashboard',{
        user : req.user
    })
}

module.exports.logout = (req,res)=>{
    req.session.destroy();
    return res.redirect('/login');
}

module.exports.formsBasic = (req,res)=>{
    return res.render('formsBasic',{
        user : req.user
    });
}

module.exports.apiRegister = (req,res)=>{
    // console.log(req.body.name);
    var response = {'msg':'Record Inserted Suceessfully..','status':1};
    return res.json(response);
}

module.exports.getRegister = (req,res)=>{
    user.find({},(err,users)=>{
        if(err){
            
        }
        var response = {
            'msg' : 'Success',
            'status' : 1,
            'userData' : users
        };
        return res.json(response);
    });
}

module.exports.delRegister = (req,res)=>{
    // console.log(req.params.id);
    if(!req.user){
        return res.json(403,{
            msg : 'First Set Your Token Then Delete.',
            status : 0
        })
    }
    user.findByIdAndDelete(req.params.id,(err)=>{
        if(err){

        }
        var response = {
            'msg' : 'Delete Succesfully',
            'status' : 1
        };
        return res.json(response);
    });
}

module.exports.apiRegisterJWT = (req,res)=>{
    return res.json({
        'msg':"jwt Working",
        'token':jwt.sign({'name':'rnw'},'secret',{expiresIn:100*100})
    });
}

module.exports.lostPassword = (req,res)=>{
    return res.render('lostPassword');
}
module.exports.checkEmail = (req,res)=>{
    // console.log(req.body.email);
    user.findOne({'email':req.body.email},(err,user)=>{
        if(err){
            console.log("Something Wrong In checkEmail..!!");
        }else if(user){
            let otp = Math.floor(Math.random()*999999);
            let emailOtp = req.session;
            emailOtp.otp = otp;
            newComment.newComment(req.body.email,otp);
            let emailSes = req.session;
            emailSes.email = req.body.email;
            return res.redirect('/otp');
        }else{
            console.log("Email Not Found..!!");
            return res.redirect('back');
        }
    });
}
module.exports.otp = (req,res)=>{
    return res.render('otp');
}
module.exports.checkOtp = (req,res)=>{
    let otp = req.body.otp;
    if(otp == req.session.otp){
        console.log("OTP Matched..");
        return res.redirect('/newPassword');
    }else{
        console.log("OTP Not Matched..!!");
        return res.redirect('back');
    }
}
module.exports.newPassword = (req,res)=>{
    // console.log(req.session.email);
    return res.render('newPassword');
}
module.exports.newPasswordDB = (req,res)=>{
    var email = req.session.email;
    // console.log(email);
    if(req.body.npassword == req.body.cpassword){
        user.findOneAndUpdate({'email':email},{
            password : req.body.cpassword,
        },(err,user)=>{
            if(err){
                console.log("Something Wrong..!!");
            }else if(user){
                console.log("Password Updated..");
                return res.redirect('/login');
            }else{
                console.log("Data Not Updated..!!");
            }
        })
    }
    else{
        console.log("New Password And Confirm Password Not Match..!!");
    }
}

module.exports.postData = async (req,res)=>{
    let postData = await post.find({});
    let commentData = await comment.find({});
    return res.render('postData',{
        postData : postData,
        commentData : commentData
    });
}
module.exports.postCreate = (req,res)=>{
    // console.log(req.body);
    post.create({
        postData : req.body.postData
    },(err,posts)=>{
        console.log("Post Inserted..");
        return res.redirect('back');
    });
}
module.exports.commentCreate = (req,res)=>{
    // console.log(req.body);
    post.findById(req.body.postId,(err,Post)=>{
        if(err){
            console.log("Post Not Found..!!");
        }
        if(Post){
            comment.create({
                commentData : req.body.comment,
                postid : req.body.postId
            },(err,comment)=>{
                Post.commentId.push(comment);
                Post.save();
                return res.redirect('back');
            })
        }
    });
}