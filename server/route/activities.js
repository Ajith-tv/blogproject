const express = require('express');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const {jwtsign,jwtverify}=require('../common/auth')

const activiteModel =require('../models/activityModel')

const uploadDir = path.join(__dirname, '../uploads'); 


const Mulstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the upload directory exists
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const upload = multer({ storage: Mulstorage });


Router.use(express.urlencoded({ extended: false }));
Router.use(express.json());


Router.post('/addActivty', upload.fields([{ name: 'images' }]), (req, res) => {

  console.log('Request Body:', req.body);
  console.log('Uploaded Files:', req.files);

const {token,...data}=req.body
console.log('evdepoi des',data);

const userdetil = jwtverify(token)
console.log(userdetil.email);
const imagearray=[]
const images = req.files['images'] || [];
images.forEach(item=> imagearray.push(item.filename))

activiteModel.create({...data,userid:userdetil.email,images:imagearray}).then(result=>{
    return  res.status(200).json({status:1, msg :'activity posted'})
    
}).catch(err=>{
    console.log(err);
    return  res.status(500).json({status: 0, msg :' activity add failed '})
})

});

Router.get('/activites',(req,res,next)=>{
activiteModel.find({}).then(result=>{
        const data = result.map(activity => ({
            ...activity._doc,  
            images: activity.images.map(image => `${req.protocol}://${req.get('host')}/${image}`),
           
        }));
        res.status(200).json({status:1,data:data})
    }).catch(err=>{
        res.status(500).json({status:0,msg:err.message})
    })
 })


Router.put('/join',async(req,res,next)=>{
    console.log(req.body.userid);
    
    try {
        const data = await activiteModel.findOne({ _id: req.body.id });
        console.log(data.members);
        
        if(data.members.length<1){
            const updated =await activiteModel.updateOne({_id:req.body.id},{members:[req.body.userid]})
        }else{
            let memberlist =data.members
            console.log(memberlist);
            
            memberlist.push(req.body.userid)
            console.log('thiss',memberlist);

             const updated =await activiteModel.updateOne({_id:req.body.id},{members:memberlist})
        }
        res.status(200).json({status:1,msg:"you joined the activity"})
     console.log(data.title);
     
    } catch (error) {
        console.log(err);
        res.status(503).json({status:1,msg:"you join request to  the activity faild "})
        
    }
   
    
})

module.exports = Router; 
