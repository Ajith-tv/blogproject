const mongoose = require('mongoose');

mongoose.connect(process.env.url)
  .then(() => console.log('db connected'))
  .catch(err => console.error('db connection error', err));
 