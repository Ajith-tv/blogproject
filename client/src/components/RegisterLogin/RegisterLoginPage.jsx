import { Box, Container } from '@mui/material'
import {Route,Routes} from 'react-router-dom'
import React from 'react'
import RegisterForm from './registerForm'
import Otpinput from './otpinput'
import Loginform from './loginForm'
import Forgotpassword from './forgotpassword'
import Passwordchangeotp from './passwordChangeOtp'
import Newpassword from './newpassword'


const RegisterLoginPage = () => {
    return (
        <Container  >

            <Box width={'100%'} display="flex" justifyContent="center" height={'100vh'}  >

                <Box  width={{xs:'100%',sm:'40%'}}  >
                
                    <Routes>
                        <Route path='/' element={<RegisterForm/>} />
                        <Route path='/otp' element={<Otpinput/>} />
                        <Route path='/login'element={<Loginform/>} />
                        <Route path='/forgotpassword'element={<Forgotpassword/>} />
                        <Route path='/paswwordchangeotp' element={<Passwordchangeotp/>} />
                        <Route path='/newpassword' element={<Newpassword/>} />
                    </Routes>

                </Box>

            </Box>
        </Container>
    )
}

export default RegisterLoginPage