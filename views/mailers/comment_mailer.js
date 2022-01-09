const res = require('express/lib/response');
const nodeMailer = require('../../config/nodemailer');  // middleware

exports.newComment = (email,otp) => {
    // console.log("inside newComment mailer");
    // console.log(email);
    nodeMailer.transporter.sendMail({
        from : 'krunaltradanode@gmail.com',
        to : email,
        subject : "New Comment Published",
        html : '<h1>Your OTP : '+ otp +' </h1>',
    },(err,info) => {
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("message send",info);
    });
}