require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api = require('./routes/api');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

mongoose.connect(process.env.DB_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use('/',api)
app.use('/auth',auth)

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running on port 3000');
})