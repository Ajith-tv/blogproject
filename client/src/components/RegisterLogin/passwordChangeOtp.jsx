import { Box, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './otpinput.css'
import AXIOS from 'axios'

const Passwordchangeotp = ({length=4}) => {
    const [otp,setOtp]=useState(new Array (length).fill(""))
    const [error,setError]=useState(false)
    const [errormsg,setErrormsg]=useState("")
  //  console.log(otp);
   const inputRefs= useRef([])
   const nav=useNavigate()

   useEffect(()=>{
    if(inputRefs.current[0]){
        inputRefs.current[0].focus()
    }
   },[])

    const handlechnage=(index,e)=>{
        const value=e.target.value
        if(isNaN(value)) return;
        const newotp =[...otp]
        newotp[index]=value.substring(value.length - 1)
        setOtp(newotp)
      //  console.log(otp);

         //move to next  filed

         if(value && index<length-1 && inputRefs.current[index+1]){
            inputRefs.current[index+1].focus()
         }
         if(error){
            setError(false)
            setErrormsg('')
        }


    }
    const handleClick=(index)=>{

        inputRefs.current[index].setSelectionRange(1,1)
        if(error){
            setError(false)
            setErrormsg('')
        }
    }

   
    const handlesubmit=()=>{
        const newotp=otp.join("")
          AXIOS.post('http://localhost:8000/user/OTPverifypass' ,{userotp:newotp,token:sessionStorage.getItem('token')}).then(result=>{
          //  console.log(result);

          
            if(result.data.status==1){
           //  console.log('ffyyf');
             nav('/userreg/newpassword')
              
            }
            
          }).catch(err=>{
            setError(true)
            setErrormsg(err.response.data.msg)
           
          //  console.log(err);
            
          })
    
        
    
      }
    

    
    const handleKeyDown=(index,e)=>{
        if(e.key === "Backspace"  && !otp[index] && index>0 && inputRefs.current[index-1]){
            inputRefs.current[index-1].focus()
        }
        if (e.key === ' ') {
            e.preventDefault();
        }
        const newotp =otp.join('')
        if(e.key==="Enter" && newotp.length==4){
            handlesubmit()
        }
    }
      
    
  return (
    <Box sx={{
       
        p:3,
        
         height:'100%'
    }}>
       <Box sx={{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    mt:'40%',
   
   }}>
    <Typography color={'red'} component="h1" sx={{fontSize:{xs:'12px',sm:'16px'},marginBottom:{sx:'10px',lg:'20px'}}} gutterBottom>
                    An OTP has sent to   {sessionStorage.getItem('email')}
                </Typography>


              <Box marginBottom={3}>
              {
                otp.map((value,index)=>{
                    return <input key={index} value={value} type='text' 
                    ref={(input)=>inputRefs.current[index]=input}
                    onChange={(e)=>handlechnage(index,e)}
                    onClick={()=>handleClick(index)}
                    onKeyDown={(e)=>handleKeyDown(index,e)}
                    className={error ? 'otpinput  inerror':'otpinput'}
                    />
                })
                
              }
               <Typography color={'red'}>{errormsg}</Typography>
              
              </Box>

   </Box>  
    </Box>
  
  )
}


export default Passwordchangeotp 