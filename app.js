const app = require('./Backend/src/api/api')
const express = require('express')
const PORT = 3000;
app.use('/public',express.static('/public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

app.listen(PORT,console.log(`Server Running at ${PORT} `))