import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Link, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import {useNavigate} from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

const Forgotpassword = () => {
    const [data,setData]=useState({})
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [valdata,setValdata]=useState({})
    const nav =useNavigate()
    
    const handlechange=(e)=>{
        let {name,value}=e.target
        
        setData({...data,[name]:value})

        if(valdata[name]){
          delete valdata[name]}
        //console.log(valdata ,'nadako');
        
    

    
      }


      const handlesubmit=(e)=>{
        e.preventDefault()
        //console.log('this',data);
        const url ='http://localhost:8000/user/changepassword'
        AXIOS.post(url,data).then(res=>{
        //console.log('maillll',res);

        if(res.data.status == 1 ){
           
            sessionStorage.setItem('token',res.data.token)
            sessionStorage.setItem('email',res.data.email)
            // console.log(res.data.token);
            
            nav('/userreg/paswwordchangeotp')
         
        }

        }).catch(error=>{
          if(error.response.data.status==2){
            setValdata(error.response.data.obj)
            
        
          }

          if(error.response.data.status == 0 ){
            handleOpen()
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

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This Email Dont Exist
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button  variant="contained" onClick={()=>nav('/usereg/register')}>Sing Up</Button>
          </Typography>
        </Box>
      </Modal>
          <Box sx={{    display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding:'0px 10%',
                        marginTop:'10%' 
                    }}
                >
                     <Avatar sx={{ m: 3, border:'2px solid lightgray'}}>
                      <LockOutlined/>
                     </Avatar>
                     <Typography color={'gray'} component="h1" variant="h4">
                         Change Password
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
     
     
     
               
     
              
               
                    <Button
                     
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                      Reset Password
                    </Button>
     
                    <Grid container  fontSize='10px'>
                         <Grid item xs={4} textAlign={'start'}>
                        
                         </Grid>
                         <Grid item xs={8}  textAlign='right'>
                             <Link href="/usereg/register" >Dont have an account? Sign up</Link>
                         </Grid>
                     </Grid>
                    
                    </Grid>
                    </Box>
     
                </Box>
        
        </>
       )
     }

export default Forgotpassword