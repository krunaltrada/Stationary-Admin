const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/StationaryProject');
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error In Mongoose Connection..!!"));
db.once('open',(err)=>{
    if(err){
        console.log("DB Not Connected..!!");
        return false;
    }
    console.log("DB Connected Successfully..");
});