import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import {useNavigate} from 'react-router-dom'





const Loginform = () => {
    const [data,setData]=useState({})
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const[allfilled,setallfilled]=useState(true)
    const [valdata,setValdata]=useState({})
    const nav =useNavigate()
    

    const handlechange=(e)=>{
        let {name,value}=e.target
        
        setData({...data,[name]:value})

        if(valdata[name]){
          delete valdata[name]}
        //console.log(valdata ,'nadako');
        
        
    

        if(data.email && data.Password){
          setallfilled(false)
        }
      }


      const handlesubmit=(e)=>{
        e.preventDefault()
        //console.log('this',data);
        const url ='https://blogproject-backend-5naj.onrender.com/user/login'
        AXIOS.post(url,data).then(res=>{
        //console.log('maillll',res);

        if(res.data.status == 1 ){
          //console.log('yessssss');
          
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('login',true)
            nav('/')
          
        }

        }).catch(error=>{
          if(error.response.data.status=='inputerror'){
            setValdata(error.response.data.msg)
          }else if (error.response.data.status == 'emailError'){
            setValdata({email:" "})
            alert(error.response.data.msg) 
          }else{
            //console.log(error);
            
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
                   padding:'0px 20%',
                   marginTop:'10%' 
               }}
           >
                <Avatar sx={{ m: 3, border:'2px solid lightgray'}}>
                 <LockOutlined/>
                </Avatar>
                <Typography color={'gray'} component="h1" variant="h4">
                    Sign in
                </Typography>
               

               <Box component="form" noValidate  sx={{ mt: 3 }} onSubmit={handlesubmit}>
           <Grid container spacing={2}>
           

           

             <Grid item xs={12}>

               <TextField variant="standard" required  fullWidth  id="email" label="Email Address"  name="email" type='email'
                 InputLabelProps={{style: { color: 'lightgray'}}}
                 inputProps={{style :{color:'black'}, onKeyDown: handleKeydown }}
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
                inputProps={{style :{color:'black'}, onKeyDown: handleKeydown }}
                onChange={handlechange}
                helperText={valdata.Password}
                error={valdata.Password? true:false}
               />

              </Grid>
          
               <Button
                disabled={allfilled}
               type="submit"
               fullWidth
               variant="contained"
               sx={{ mt: 3, mb: 2 }}
               >
               Sign IN
               </Button>

               <Grid container  fontSize='10px'>
                    <Grid item xs={4} textAlign={'start'}>
                        <Link href="/userreg/forgotpassword"  >Forgot Passwod ?</Link>
                    </Grid>
                    <Grid item xs={8}  textAlign='right'>
                        <Link href="/userreg" >Dont have an account? Sign up</Link>
                    </Grid>
                </Grid>
               
               </Grid>
               </Box>

           </Box>
   
   </>
  )
}

export default Loginform