const express = require('express')
const Router = express.Router()
Router.use(express.urlencoded({ extended: false }))
Router.use(express.json())

const userModel = require('../models/userModel')
const validate=require('../common/validation')
const {createOTP}=require('../common/otp')
const {encrypt,decrypt}=require('../common/crypto')
const createMail =require('../common/sentMail')
const {jwtsign,jwtverify}=require('../common/auth')

Router.post('/register', async (req, res, next) => {
    try {

        const isUserExist = await userModel.find({ email: req.body.email })
        if (isUserExist.length > 1) {
            return res.status(503).json({ status: 2, msg: 'email already in use' })
        } else {
            next()
        }

    } catch (error) {

        console.log(err);


    }
}, (req, res, next) => {
    let errorObj = {}
    if(!validate.Namevalidation('User Name',req.body.UserName)[0]){
       errorObj.firstName=validate.Namevalidation(' User Name',req.body.firstName)[1]
    }
  
    if(!validate.validateEmail(req.body.email)[0]){
       errorObj.email=validate.validateEmail(req.body.email)[1]
    }
    if(!validate.passwordval('password' ,req.body.Password)[0]){
       errorObj.Password = validate.passwordval('password' ,req.body.password)[1]
    }
    if(req.body.confirmpassword == '' || !req.body.confirmpassword ){
       errorObj.confirmpassword= "caonfirm passdord cant be empty"
    }
  
    console.log(errorObj);

    const objlength =Object.keys(errorObj).length
        if(objlength>0){
                res.status(400).send(errorObj) 
        }else{
            next()
        }

},(req,res,next)=>{

  const {confirmpassword,...data}=req.body
  
  
  data.Password=encrypt(data.Password,process.env.encyptkey)

    //console.log(data);
    
    const otp =createOTP()
    //console.log(otp);
    
    const table ={
        otp:otp,
        userData:data
    }
    req.header.tabel=table
    next()
   
    

}, (req,res,next)=>{
    const mailcon={
      to: req.body.email,
      subject: 'Email verification OTP ',
      text:`your one time OTP is ${req.header.tabel.otp} , Dont share with anyone`

  }
  createMail(mailcon).then(result=>{
      next()
  }).catch(err=>{
      res.status(502).json({status:0,msg:'enter valid email'})
  })
}, (req,res,next)=>{
    console.log(req.header.tabel);
    
    jwtsign(req.header.tabel,(err,token)=>{
        if(err){
            return res.status(400).json({status:'0',msg:err})
        }else{
            return res.status(200).json({status:1,token:token})
        }
       })
    }

)
 
module.exports = Router