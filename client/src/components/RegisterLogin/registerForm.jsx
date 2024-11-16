import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import {useNavigate} from 'react-router-dom'





const RegisterForm = () => {
    const [data,setData]=useState({})
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const[allfilled,setallfilled]=useState(true)
    const [valdata,setValdata]=useState({})
    const nav =useNavigate()
    


    

    const handlechange=(e)=>{
        let {name,value}=e.target
        setData({...data,[name]:value})

        if(valdata[name]){
          delete valdata[name]
        }
      //  console.log(valdata ,'nadako');
        
        console.log(data);
        
        if(e.target.name=="confirmpassword" && data.Password){
          setPasswordMismatch(data.Password.trim() !== e.target.value.trim())
        }

        if(data.UserName  && data.email && data.Password &&  data.confirmpassword){
          setallfilled(false)
        }
      }


      const handlesubmit=(e)=>{
        sessionStorage.setItem('email',data.email)
        data.role='customer'
        e.preventDefault()
      //  console.log('this',data);
        const url ='http://localhost:8000/user/register'
        AXIOS.post(url,data).then(res=>{
       console.log('maillll',res.data);
        if(res.data.status ==1 ){
          
          sessionStorage.setItem('token',res.data.token)
          nav('/otp')
        }else{
          setValdata({email:'invalid email'})
        }
        
        }).catch(error=>{

          if(error.response.data.status==2){
            setValdata({email:'enter another email'})
          //  console.log(valdata);
            
            alert(error.response.data.msg)
            
          }else{
            console.log(error.response.data);
            
            setValdata(error.response.data);  
        //  console.log('kityo?',valdata);

          }
          
          
        })
        
      }


      const handleKeydown = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }

    };
   
  return (
   <>
     <Box sx={{    display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                 padding:'0 10%',
                   marginTop:'10%' 
               }}
           >
                <Avatar sx={{ m: 3, border:'2px solid lightgray'}}>
                 <LockOutlined/>
                </Avatar>
                <Typography color={'gray'} component="h1" variant="h4">
                    Sign up
                </Typography>
               

               <Box component="form" noValidate  sx={{ mt: 3 }} onSubmit={handlesubmit}>
           <Grid container spacing={2}>
             <Grid item xs={12} >

               <TextField name="UserName" required variant="standard" fullWidth  id="firstName" label="User Name" autoFocus 
                 InputLabelProps={{style: { color: 'lightgray'}}}
                inputProps={{style :{color:'#3d508a'}, onKeyDown: handleKeydown }}
                onChange={handlechange}
                 helperText={valdata.UserName }
                error={valdata.UserName ? true:false}
                 
               /> 
             </Grid>
 
            

             <Grid item xs={12}>
               <TextField variant="standard" required  fullWidth  id="email" label="Email Address"  name="email" type='email'
                 InputLabelProps={{style: { color: 'lightgray'}}}
                 inputProps={{style :{color:'#3d508a'}, onKeyDown: handleKeydown }}
                onChange={handlechange}
                helperText={valdata.email }
                error={valdata.email? true:false}
                 
                
                

               />
             </Grid>



          

             <Grid item xs={12} >
               <TextField
               variant="standard"
                 required
                 fullWidth
                 name="Password"
                 label="Password"
                 type="password"
                 id="password"
                 autoComplete="new-password"
                 InputLabelProps={{style: { color: 'lightgray'}}}
                inputProps={{style :{color:'#3d508a'}, onKeyDown: handleKeydown }}
                onChange={handlechange}
                helperText={valdata.Password}
                error={valdata.Password? true:false}
               />

              </Grid>
              <Grid item xs={12}>
               <TextField
               variant="standard"
                 required
                 fullWidth
                 name="confirmpassword"
                 label="Confirm Password"
                 type="password"
                 id="confirm-password"
                 InputLabelProps={{style: { color: 'lightgray'}}}
                 inputProps={{style :{color:'#3d508a'}, onKeyDown: handleKeydown }}
                onChange={handlechange}
                helperText={passwordMismatch ? 'Passwords do not match' : '' || valdata.confirmpassword}
                error={passwordMismatch || valdata.confirmpassword?true:false}
                
                 
               />

              </Grid>
               <Button
                disabled={allfilled}
               type="submit"
               fullWidth
               variant="contained"
               sx={{ mt: 3, mb: 2 }}
               >
               Sign Up
               </Button>

               <Grid container  fontSize='10px'>
                    <Grid item xs={4} textAlign={'start'}>
                       
                    </Grid>
                    <Grid item xs={8}  textAlign='right'>
                        <Link href="/userreg/login" >Alredy have  an account? Sign in</Link>
                    </Grid>
                </Grid>
               
               </Grid>
               </Box>

           </Box>
   
   </>
  )
}

export default RegisterForm