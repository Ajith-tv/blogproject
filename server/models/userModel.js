const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    UserName:String,
    Password:String,
    email:String,
   
},{timestamps:true})

const userModel = mongoose.model('userInfo',userSchema)

module.exports = userModel