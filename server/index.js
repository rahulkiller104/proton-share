const express = require('express');
// const mysql = require('mysql');
const app = express()
const mongoose=require('mongoose');
require('dotenv').config();
const PORT=5000;

app.use(express.json());

const HttpError=require('./model/http-error');

const connectDB=require('./config/db');
connectDB();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});


app.use('/api/files',require('./routes/routes'));
app.use('/files',require('./routes/show'));
// app.use('/files/download',require('./routes/download'));

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });





app.listen(PORT,()=>{
    console.log('localhost:',PORT);
})

// XoJUf9RPJ6Nn7bVD