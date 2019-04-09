const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB', {useNewUrlParser: true },(err) =>{
    if (!err) { console.log('MongoDB connection succeeded')}
    else { console.log('Error connect:' + err)}
});

require('./data.model');