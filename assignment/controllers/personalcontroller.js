const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Personal = mongoose.model('personal');

router.get('/', (req, res) => {
    res.render("personal/addOrEdit",{
        viewTitle: "Insert data"
    });
});

router.post('/',(req, res) => {
    insertRecord(req, res);
});

function insertRecord(req,res){
    var personal = new Personal();
    personal.fullName = req.body.fullName;
    personal.email = req.body.email;
    personal.mobile = req.body.mobile;
    personal.address = req.body.address;
    personal.save((err, doc) => {
        if(!err)
            res.redirect('personal/list');
        else{
            console.log('Error insertion'+ err);
        }
    });

}

router.get('/list', (req, res) => {
    res.json('from list');
});

module.exports = router;