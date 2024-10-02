const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/yourdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});