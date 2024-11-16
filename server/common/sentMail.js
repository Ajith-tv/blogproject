const nodemailer =require('nodemailer');
require('dotenv').config()

const transporter  =nodemailer.createTransport({
    service:'gmail',
    host :'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:process.env.usermailid,
        pass:process.env.usermailPass
    }
})

const mailoption={
    from:{
        name:'TechNext',
        adress :'ajajithtv@gmail.com'
    },
}

async function createMail(emaild) {

    transporter.sendMail({...mailoption,...emaild}).then(result=>{
        console.log('mail send' ,);   
    }).catch(err=>{
        console.log("mailer error",err);
        
    }
    )
    
}


module.exports=createMail