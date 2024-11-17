import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMediaQuery, useTheme } from '@mui/material';

export default function ActivityImageList({ itemData }) {
  console.log(typeof itemData);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // xs screen
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // sm screen
  const isMd = useMediaQuery(theme.breakpoints.up('md')); // md and larger

  // Dynamically set the number of columns
  const cols = isXs ? 1 : isSm ? 2 : 3;

  return (
    <Box sx={{ width: '90%', maxHeight: 600, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={cols} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item}>
            <img
              srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item}?w=248&fit=crop&auto=format`}
              alt="blogimage"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
