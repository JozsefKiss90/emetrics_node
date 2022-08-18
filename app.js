const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const rtTask = require('./routes/api/rt')
const flankerTask = require('./routes/api/flanker')
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.static('public/esportmetrics'))

const dbURI = process.env.mongoURI;
mongoose.connect(dbURI)
.then(()=>console.log('database connected'))
.then(()=>app.listen(process.env.PORT || 3000))
.catch(err=>console.log(err))

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use('/api/rt', rtTask)
app.use('/api/flanker', flankerTask)

console.log('Running at Port 3000');

