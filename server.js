const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //enables you to get info from body

const items = require('./routes/api/items');

const app = express();

//bodyParser middleware
app.use(bodyParser.json());

// MongoDB URI - need this to connect too
const db = require('./config/keys').mongoURI;

// conect to mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// USE ROUTES
app.use('/api/items', items); //set to items variable above

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
