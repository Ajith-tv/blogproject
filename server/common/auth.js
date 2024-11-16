const jwt=require('jsonwebtoken');
require('dotenv').config();



function  jwtsign(body,calback) { 

    
     jwt.sign(body,process.env.jwt_key,(err,token)=>{
    if(err){
        calback(err.message);
    }else{
        calback(null,token)
    }
 })
    
}



function jwtverify(body){
    
const decoded=jwt.verify(body,process.env.jwt_key)
return decoded
}



module.exports={jwtsign,jwtverify}