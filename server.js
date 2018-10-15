// Dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');

// Init App
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB with MLAB URI 
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Now Connected to MongoDB');
});



// // Init static assets
if (process.env.NODE_ENV === 'production') {
    // Set static content to public directory
    app.use(express.static(path.join(__dirname, 'public')));
}

// User morgan to log all requests
app.use(logger('dev'));

// Init hanlebars as view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser Middleware 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Import routes from controller folder so server has access to them
const routes = require('./controllers/controller.js');
app.use(routes);

// Init server and begin listening
app.listen(PORT, function () {
    console.log(`Server now listening on port: ${PORT}`);
});