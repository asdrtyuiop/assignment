const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test03', { useNewUrlParser: true });

const app = express();
app.use(cors());

//Middlewares
app.use(morgan('dev'));

app.use(bodyParser.json());

//Routes
app.use('/users',require('./routes/users'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Strat server
//const port = process.env.PORT || 3000;
//app.listen(port);
//console.log('server running...');

module.exports = app;