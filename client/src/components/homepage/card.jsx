import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@mui/material';
import AXIOX from 'axios'


export default function Cards({ data }) {
    const theme = useTheme();
    const token = localStorage.getItem('token')
    const userdata = jwtDecode(token)
    console.log(userdata.UserName);

    const handlejoin = () => {
        console.log(data);

        const neededdat = {
            id: data._id,
            userid: userdata.email
        }

        AXIOX.put("http://localhost:8000/activity/join", neededdat).then(result => {
            alert(result.data.msg)
        }).catch(err => {
            alert(err.response.dat.msg)
        })
    }

    return (
        <Card
            sx={{
                display: 'flex',
                width: '100%',
                height: '200px', // Fixed height for consistent design
            }}
        >
            {/* Card Content Area */}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {data.title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {userdata.UserName}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                {!data.members.includes(userdata.email) && data.userid !== userdata.email && (
  <Button onClick={handlejoin}>Join</Button>
)}
                </Box> 
            </Box>

            {/* Card Media Area */}
            <CardMedia
                component="img"
                sx={{
                    width: '50%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                image={data.images[0]}
                alt="Image"
            />
        </Card>
    );
}
