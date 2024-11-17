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
    console.log(req.body.UserName);
    
    if(!validate.Namevalidation('User Name',req.body.UserName)[0]){
       errorObj.UserName=validate.Namevalidation(' User Name',req.body.firstName)[1]
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

Router.post('/OTPverify',async(req,res,next)=>{
   
     
 
    const data=jwtverify(req.body.token)
    if(req.body.userotp ==data.otp){

        userModel.create(data.userData).then(result=>{
            
            jwtsign(data.userData,(err,token)=>{
                if(err){
                    return res.status(400).json({status:'0',msg:err})
                }else{
                    res.status(200).json({status:1,msg:'account created' ,token:token})
                }
               })

        }).catch(err=>{
            res.status(503).json({status:0,msg:'account creation faild'})
        })

    }else{
        res.status(503).json({status:0,msg:'otpnot match'})
    }
    


})


Router.post('/login',(req,res,next)=>{
      console.log('ahh?');
      
    const erorrarray={};


    if(!validate.validateEmail(req.body.email)[0]){
        erorrarray.email=validate.validateEmail(req.body.email)[1]
    }
    if(!validate.passwordval('password' ,req.body.Password)[0]){
        erorrarray.Password = validate.passwordval('password' ,req.body.Password)[1]
    }

    const objlength =Object.keys(erorrarray).length
    if(objlength>0){
            res.status(500).json({status:'inputerror',msg:erorrarray}) 
    }else{
        next()
    }

    
    
},async(req,res,next)=>{
    console.log(req.body.email);
    
    try{
        const userData= await userModel.findOne({email:req.body.email}).lean()
        
        console.log( 'this',userData);

         
        if(!userData || userData==null){
          return  res.status(503).json({status:'emailError',msg :'user not found check your email or signup'})
        }

        const {Password,_id,...restData}=userData

        const Dbpassword=decrypt(Password,process.env.encyptkey)
        console.log(Dbpassword);
        

        if(req.body.Password == Dbpassword){


            jwtsign(restData,(err,token)=>{
                if(err){
                    return res.status(503).json({status:'0',msg:err})
                }else{
                  return  res.status(200).json({status:1 ,token:token})
                }
               })
        }else{ 
            return res.status(500).json({status:'inputerror',msg:{Password:'wrong password'}})
        }
        
    }catch(err){

        console.log(err);
         res.status(503).json({status:0,msg :'cant find the account'})
    }
  
})
 

Router.post('/changepassword',(req,res,next)=>{

    let erorrarray={}
    if(!validate.validateEmail(req.body.email)[0]){
        erorrarray.email=validate.validateEmail(req.body.email)[1]
    }
    const objlength =Object.keys(erorrarray).length
    if(objlength>0){
            res.status(503).json({status:2,obj:erorrarray}) 
    }else{
        next()
    }
    
},(req,res,next)=>{

    userModel.find({email:req.body.email}).then(result=>{
        console.log(result);
        
        if(result.length>0){ 
            
            next()
         
        }else{
            return res.status(503).json({status:0,msg:'This Email Dont Exist, Sing UP '})
           
        }
        
    }).catch(err=>{
        console.log(err);
        
        
    })


}, (req,res,next)=>{

    const otp =createOTP()
    req.header.otp =otp
    const mailcon={
      to: req.body.email,
      subject: 'Password change OTP ',
      text:`your one time OTP is ${otp} , Dont share with anyone`

  }
  createMail(mailcon).then(result=>{
      next()
  }).catch(err=>{
      res.status(502).json({status:0,msg:'enter valid email'})
  })
},(req,res,next)=>{
    console.log(req.header.otp);
    const data ={
        otp:req.header.otp,
        email:req.body.email
    }
    jwtsign(data,(err,token)=>{
        if(err){
            return res.status(400).json({status:'0',msg:err})
        }else{
            return res.status(200).json({status:1,token:token,email:req.body.email})
        }
       })
    })


    Router.post('/OTPverifypass',async(req,res,next)=>{
   
     
 
        const data=jwtverify(req.body.token)
        console.log(data);
        
        if(req.body.userotp ==data.otp){
     
         return res.status(200).json({status:1})
    
        }else{
            res.status(503).json({status:0,msg:'otpnot match'})
        }
        
    
    
    })

    Router.put('/newpassword',(req,res,next)=>{
        let erorrarray={}
    
        if(!validate.passwordval('password' ,req.body.Password)[0]){
            erorrarray.password = validate.passwordval('password' ,req.body.password)[1]
        }
        if(req.body.confirmpassword == '' || !req.body.confirmpassword ){
            erorrarray.confirmpassword= "caonfirm passdord cant be empty"
        }
        const objlength =Object.keys(erorrarray).length
        if(objlength>0){
                res.status(503).json({status:0,obj:erorrarray})
        }else{ 
          next()}
    },(req,res,next)=>{
    
        const data=jwtverify(req.body.token)
        const Password=encrypt(req.body.Password,process.env.encyptkey)
        console.log(Password);
    
    
    
        userModel.updateOne({email:data.email},{Password:Password}).then(result=>{
            res.status(200).json({status:1,msg:"password changed"})
            
        }).catch(err=>{
            console.log(err);
            res.status(503).json({status:2,msg:'password chnage faild'})
            
        })
        
    })

module.exports = Router