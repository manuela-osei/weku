/* Importing all the module required to start the server */
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Server middleware
app.enable('trust proxy');
//data being sent and recieve is gonna be passed into json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//specify an IP address - accepting from anysource
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');//methods being supported
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");//supporting headers
    next();
});

module.exports = app;