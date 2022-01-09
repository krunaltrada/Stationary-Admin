const user = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.loginToken = async (req,res)=>{
    // console.log("login api");
    var userData = await user.findOne({email:req.body.email});
    // console.log(req.body);
    if(!userData || userData.password != req.body.password){
        return res.json(403,{
            msg : "Password Not Match.",
        });
    }
    else{
        return res.json(200,{
            msg : "Record Found.",
            data : {
                token : jwt.sign(userData.toJSON(),"kuniyo",{expiresIn:'1000000'}),
            }
        });
    }
}