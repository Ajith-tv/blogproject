import React from 'react'
import Navbar from './components/navbar/navbar'
import RegisterLoginPage from './components/RegisterLogin/RegisterLoginPage'
import {Route,Routes} from 'react-router-dom'
import Landingpage from './components/homepage/landingpage'
import Activitypage from './components/homepage/activitypage'
import { Box } from '@mui/material'
const App = () => {
  return (

    <>
    <Navbar/>
   <Box mt={10}>
    
   <Routes>
    <Route path='/' element={<Landingpage/>}/>
    <Route path='/activity/:id' element={<Activitypage/>} />
    <Route path='/userreg/*' element={<RegisterLoginPage/>}/>
   </Routes>
   </Box>
    
    
    </>

  )
}

export default App