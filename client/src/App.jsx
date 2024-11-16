import React from 'react'
import Navbar from './components/navbar/navbar'
import RegisterLoginPage from './components/RegisterLogin/RegisterLoginPage'
import {Route,Routes} from 'react-router-dom'
import Landingpage from './components/homepage/landingpage'
const App = () => {
  return (

    <>
    <Navbar/>

   <Routes>
    <Route path='/' element={<Landingpage/>}/>
    <Route path='/userreg/*' element={<RegisterLoginPage/>}/>
   </Routes>
    
    
    </>

  )
}

export default App