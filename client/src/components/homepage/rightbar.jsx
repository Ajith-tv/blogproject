import { Box, Typography } from '@mui/material'
import React from 'react'

const Rightbar = () => {
  return (
    <Box  flex={1} p={2} sx={{display:{xs:"none",sm:"block"}}}>
        <Typography>Joined activities Here</Typography>
        </Box>
  )
}

export default Rightbar