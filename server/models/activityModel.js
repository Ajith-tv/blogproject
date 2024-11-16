const mongoose = require('mongoose')

const activitySchema =new mongoose.Schema({
    userid:String,
   title:String,
   Desscription:String,
   images: [String],
   members:[String],
},{timestamps:true})

const activityModel = mongoose.model('activites',activitySchema)

module.exports = activityModel