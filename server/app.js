const express= require('express')
const app =express()
require('dotenv').config();

const cors=require('cors')
const db = require('./common/dbConnection')
const path = require("path");
app.listen( process.env.port)
app.use(cors())

const userRoute = require('./route/user')
const activityRoute = require('./route/activities')

app.use( express.static(path.join(__dirname, 'uploads')));
app.use('/user',userRoute)
app.use('/activity',activityRoute)