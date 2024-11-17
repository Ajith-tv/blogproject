import { Box, Fab, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddNew from './addNew';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 14,
    borderRadius: 1,
    p: 4,
    width: { xs: '90%', sm: '70%', md: '50%', },
};



const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const activities = useSelector((state) => state.activities.items);
    const token = localStorage.getItem('token'); 
    const [userid,setUserid]=useState(null)
    const nav =useNavigate()
    
    useEffect(()=>{
       if(token){
         const userdata=jwtDecode(token)
         setUserid(userdata.email)
       }
    },[])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box flex={1} p={2} borderRight={'1px solid #e3e8e5'} >
                <Box position={'fixed'} mt={5}>
                    <Typography variant='h3' fontSize={30} >Your Blogs</Typography>
                    {userid &&
                        <Box mt={2} display={'flex'} 
                        flexDirection={'column'}
                         justifyContent={'center'}
                           alignItems={'center'} 
                           width={'100%'} 
                           bgcolor={'#f7faf8'}
                            p={2}
                             height={400}
                              overflow={'scroll'}
                              sx={{
                                scrollbarWidth: 'none', // For Firefox
                                '&::-webkit-scrollbar': {
                                  display: 'none', // For Chrome, Safari, and Edge
                                },
                              }}>
                           
                    {activities.filter(item => item.userid === userid).map((item, index) => {
                        return(
                        <Box bgcolor={'blue'} width={{xs:200,md:100,lg:200}} p={1} mb={1} borderRadius={1} >
                        <Typography key={item._id} sx={{color:'white'}} onClick={()=>nav(`/activity/${item._id}`)} >
                        {item.title}
                        </Typography>
                        </Box>)
})}
                    

                        </Box>
                      }
                  
                    <Fab color="primary" aria-label="add" onClick={handleOpen}sx={{mt:2}} >
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddNew  onClose={handleClose}  />
                </Box>
            </Modal>
        </>
    )
}

export default Sidebar