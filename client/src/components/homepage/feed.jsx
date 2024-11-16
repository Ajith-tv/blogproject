import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Cards from './card';

const Feed = () => {
  const activites = useSelector((state) => state.activities.items);


  return (
    <Box flex={4} p={2}>
      <Box pt={15} pb={10}>
        <Typography variant='h1' fontSize={{ xs: 30, sm: 50 }} >What's New?</Typography>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {[...activites].reverse().map((item, index) => (
          <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
            <Cards data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed;
