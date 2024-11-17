import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import ActivityImageList from './activityImageList';
import { fetchActivities } from '../../redux/activityslice';
const Activitypage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [actData, setActData] = useState(null); // Start with null to handle loading state
  const activities = useSelector((state) => state.activities.items);

  useEffect(() => {
    if (activities.length > 0) {
      const foundData = activities.find((item) => item._id === id);
      setActData(foundData || {});
    }else{
        dispatch(fetchActivities());
    }
  }, [activities, id]);

  if (!actData) {
    // Show loading or fallback UI if actData is null
    return (
      <Box p={5}>
        <Typography variant="h5">Loading activity data...</Typography>
      </Box>
    );
  }
  

  return (
    <Box display={'flex'} flexDirection={{xs:'column',md:'row'}} >

    
    <Box width={{xxs:'100%',md:'80%'}}  p={5}>
      <Typography
        variant="h1"
        fontSize={{ xs: 30, sm: 50 }}
        fontWeight={600}
        textTransform="capitalize"
      >
        {actData.title || 'No Title Available'}
      </Typography>
      <Box width={'100%'} display={'fles'} justifyContent={'center'} mt={5}>
        {actData.images ? (
          <ActivityImageList itemData={actData.images} />
        ) : (
          <Typography>No images available for this activity.</Typography>
        )}
      </Box>
      <Box mt={3} width={'90%'} ml={'auto'} mr={'auto'}>
        <Typography variant='p'  align="justify">
            {actData.Desscription}
        </Typography>
      </Box>
    </Box>
    <Box width={{ xs: '100%', md: '20%' }} >
  {actData.members && actData.members.length > 1 ? (
    actData.members.map((item) => {
      return (
        <Box
          key={item._id} // Key should be on the outermost element in a list
          bgcolor={'blue'}
          width={{ xs: '50%', md: 100, lg: 200 }}
         
          p={1}
          mb={1}
          borderRadius={1}
        >
          <Box>
          <Typography sx={{ color: 'white' }} onClick={() => nav(`/activity/${item._id}`)}>
            {item} {/* This might need to be item.name or another field if item is an object */}
          </Typography>
          </Box>
        </Box>
      );
    })
  ) : (
    <Typography>No members available</Typography> // Optional fallback for when no members
  )}
</Box>

    </Box>
  );
};

export default Activitypage;
