import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import {useNavigate} from 'react-router-dom'





const Newpassword = () => {
    const [data,setData]=useState({})
    const [passwordMismatch, setPasswordMismatch] = useState(false);
 
    const [valdata,setValdata]=useState({})
    const nav =useNavigate()
    


    

    const handlechange=(e)=>{
        let {name,value}=e.target
        setData({...data,[name]:value})

        if(valdata[name]){
          delete valdata[name]
        }
        //console.log(valdata ,'nadako');
        
        
        if(e.target.name=="confirmpassword" && data.Password){
          setPasswordMismatch(data.Password.trim() !== e.target.value.trim())
        }

        
      }


      const handlesubmit=(e)=>{
        e.preventDefault()
        //console.log('kijij');
        
      const token = sessionStorage.getItem('token')
      //console.log(token);
      data.token =token
      
    
        //console.log('this',data);
        const url ='http://localhost:8000/user/newpassword'
        AXIOS.put(url,data).then(res=>{
               
            if(res.data.status == 1){
              sessionStorage.clear()
              nav("/userreg/login" )

            }

            
         
        
        }).catch(error=>{

          if(error.response.data.status==0){
         
            setValdata(error.response.data);  
          //console.log('kityo?',valdata);

          }else{
            alert(error.response.data.msg)
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
                    New Password
                </Typography>
               

               <Box component="form" noValidate  sx={{ mt: 3 }} onSubmit={handlesubmit}>
           <Grid container spacing={2}>
             
        

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
                helperText={valdata.password}
                error={valdata.password? true:false}
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
                 inputProps={{style :{color:'black'}, onKeyDown: handleKeydown }}
                onChange={handlechange}
                helperText={passwordMismatch ? 'Passwords do not match' : '' || valdata.confirmpassword}
                error={passwordMismatch || valdata.confirmpassword?true:false}
                
                 
               />

              </Grid>
               <Button
               
               type="submit"
               fullWidth
               variant="contained"
               sx={{ mt: 3, mb: 2 }}
               >
               change
               </Button>

               
               </Grid>
               </Box>

           </Box>
   
   </>
  )
}

export default Newpassword