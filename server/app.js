const express= require('express')
const app =express()
require('dotenv').config();

const cors=require('cors')
const db = require('./common/dbConnection')
app.listen( process.env.port)


const userRoute = require('./route/user')


app.use('/user',userRoute)