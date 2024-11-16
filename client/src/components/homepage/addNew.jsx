import { Box, Button, Divider, FormControl, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Delete, Upload } from '@mui/icons-material';
import AXIOS from 'axios'

const AddNew = ({ onClose }) => {
  const [data, setData] = useState({})
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [valdata, setValdata] = useState({})



  const handleSubmit = async (e) => {
    e.preventDefault();
    let notfilled = {

    }
    if (!data.title || data.title == ' ') {
      notfilled.title = "Titile cant be empty"
    }
    if (!data.Desscription || data.Desscription == ' ') {
      notfilled.Desscription = " Desscription cant be empty"
    }

    if (images.length < 1) {
      notfilled.images = 'minimum 1 images needed'
    }
    console.log('notfilled', notfilled);

    if (Object.keys(notfilled).length > 0) {
      // console.log(notfilled);

      setValdata(notfilled)
      return
    } else {


      const formData = new FormData();
      const token = localStorage.token;
      formData.append("token", token); // appending token (authentication)
      for (let key in data) {
        formData.append(key, data[key]); // appending text data
      }
      images.forEach((item) => formData.append("images", item)); // appending image files
      console.log(formData.title);

      AXIOS.post("https://blogproject-backend-5naj.onrender.com/activity/addActivty", formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(result => {
        // console.log(result);
        alert(result.data.msg);
        onClose();

      }).catch(err => {
        if (err.response.data.status == 0) {


          alert(err.response.data.msg)
        }

      })
    }




  }

  const handleImageChange = (e) => {



    if (valdata.images) {
      delete valdata.images
    }

    const files = Array.from(e.target.files);

    const newImages = [...images, ...files];
    setImages(newImages);

    const previews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handlechange = (e) => {
    let { name, value } = e.target
    setData({ ...data, [name]: value })

    if (valdata[name]) {
      delete valdata[name]
    }
    //  console.log(valdata ,'nadako');

    console.log(data);

    if (e.target.name == "confirmpassword" && data.Password) {
      setPasswordMismatch(data.Password.trim() !== e.target.value.trim())
    }

    if (data.UserName && data.email && data.Password && data.confirmpassword) {
      setallfilled(false)
    }
  }
  const handleImageDelete = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };
  return (
    <>
      <Box display={'flex'} flexDirection={'column'} >
        <Box textAlign={'center'} position={'relative'} mb={1}>
          <Typography variant='h1' fontSize={24} fontWeight={'bold'} >
            Whats On your Mind ?
          </Typography>

          <IconButton aria-label="close" sx={{ position: 'absolute', top: 0, right: 2 }} onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>

        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit} >
          <FormControl fullWidth>


            <TextField

              variant="standard"
              required
              fullWidth
              name="title"
              label="Title"
              type="text"
              id="Title"
              InputLabelProps={{ style: { color: 'black' } }}
              inputProps={{ style: { color: '#3d508a' } }}
              onChange={handlechange}
              helperText={valdata.title}
              error={valdata.title ? true : false}
            />


            <TextField
              variant="standard"
              required
              fullWidth
              name="Desscription"
              label="Description"
              type="Description"
              id="Description"
              InputLabelProps={{ style: { color: 'black' } }}
              inputProps={{ style: { color: '#3d508a' } }}
              onChange={handlechange}
              helperText={valdata.Desscription}
              error={valdata.Desscription ? true : false}
              multiline
              minRows={4}
              maxRows={15}
            />
            <Box>
              {imagePreviews.map((src, index) => (
                <Box key={index} style={{ display: "inline-block", margin: "2px" }}>
                  <Box
                    component="img"
                    src={src}
                    alt={`Preview ${index + 1}`}
                    sx={{ width: { xs: '50px', sm: '70px', md: '100px' }, height: { xs: '50px', sm: '70px', md: '100px' } }}
                  />
                  <IconButton type="button" onClick={() => handleImageDelete(index)}>
                    <Delete sx={{ fill: 'gray' }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Box sx={{ border: valdata.images ? '1px solid red' : '1px solid gray' }}>
              <Upload />
              <label htmlFor="images">Product </label>
              <input
                accept="image/*"
                multiple
                id="mainImage"
                type="file"
                name="images"
                onChange={handleImageChange}
              />
            </Box>





            <Button type='submit' variant="contained" sx={{ mt: 1 }}>post</Button>
          </FormControl>
        </Box>

      </Box>
    </>
  )
}

export default AddNew