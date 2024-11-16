import React, { useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import Feed from './feed';
import Sidebar from './sidebar';
import Rightbar from './rightbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../../redux/activityslice';

const Landingpage = () => {

  const status =useSelector((state)=>state.activities.status)
  const dispatch = useDispatch();
  console.log(status);

  useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchActivities());
    }
}, [status, dispatch]);
  return (
    <>

<Stack spacing={2} direction="row" width="100%" justifyContent={'space-between'} sx={{mt:10}}>
     
     <Sidebar/>
     <Feed/>
     <Rightbar/>
      </Stack>
    </>
  )
}

export default Landingpage