import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'

const Notlogin = () => {
    const nav =useNavigate()
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
        <Typography variant='h3'>
            LogIn to  acess the blogs
             
             
        </Typography>
        <Button onClick={nav('/userreg/login')}> login</Button>
    </Box>
  )
}

export default Notlogin