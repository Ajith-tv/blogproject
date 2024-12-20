import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@mui/material';
import AXIOX from 'axios'

import {useNavigate} from 'react-router-dom'

export default function Cards({ data }) {
    const nav =useNavigate()
    const theme = useTheme();
    const token = localStorage.getItem('token')
    
    const userdata = token ? jwtDecode(token) : null;
    console.log(userdata.UserName);

    const handlejoin = () => {
        console.log(data);

        const neededdat = {
            id: data._id,
            userid: userdata.email
        }

        AXIOX.put("https://blogproject-backend-5naj.onrender.com/activity/join", neededdat).then(result => {
            alert(result.data.msg)
        }).catch(err => {
            alert(err.response.dat.msg)
        })
    }

    return (
        <Card onClick={()=>nav(`/activity/${data._id}`)}
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
                {token ? (
  !data.members.includes(userdata?.email) &&
  data.userid !== userdata?.email ? (
    <Button onClick={handlejoin}>Join</Button>
  ) :null
) : (
  <Button onClick={() => alert('Please log in to join!')}>Login to Join</Button>
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
