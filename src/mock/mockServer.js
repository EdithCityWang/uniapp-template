const Mock = require('mockjs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./index.js');

const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// 转换body，用于接收body
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
