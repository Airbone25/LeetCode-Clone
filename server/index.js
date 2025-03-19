const express = require('express');
const cors = require('cors');
const api = require('./routes/api');
const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/',api)

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running on port 3000');
})