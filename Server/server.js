const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./Routes/route');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

//support parsing of application/x-www-form-urlencoded post data

app.use(bodyParser.urlencoded({ extended: true }));
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', routes);


//default route.
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Chat-App application."});
});

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
   
    })
    .then(() => {
        console.log("Successfully connected to the database");//successfully connects to the database
    })
    .catch(() => {
        console.log('Could not connect to the database');
        process.exit();
    })
app.listen(3000, () => {
    console.log("Server is listening on port : 3000")
});

