import { Box, Fab, Modal, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddNew from './addNew';



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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
                <Box position={'fixed'} >
                    <Typography>Your Blogs</Typography>
                    <Fab color="primary" aria-label="add" onClick={handleOpen}>
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