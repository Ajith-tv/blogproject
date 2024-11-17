import React, { useEffect } from 'react';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './sidebar';
import Feed from './feed';
import Rightbar from './rightbar';
import Notlogin from './notlogin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../../redux/activityslice';

const Landingpage = () => {
  const status = useSelector((state) => state.activities.status);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const theme = useTheme();

  const isXsScreen = useMediaQuery(theme.breakpoints.down('md')); // Check if the screen size is xs

  useEffect(() => {
    if (status === 'idle' && token) {
      // Only fetch activities if a token exists
      dispatch(fetchActivities());
    }
  }, [status, dispatch, token]);

  return (
    <Stack
      spacing={2}
      direction="row"
      width="100%"
      justifyContent="space-between"
      sx={{ mt: 10 }}
    >
      
      {!isXsScreen && <Sidebar />} 
      <Feed />
      {!isXsScreen &&  <Rightbar />}
    </Stack>
  );
};

export default Landingpage;
