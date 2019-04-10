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
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

//insert function 
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
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("personal/addOrEdit",{
                    viewTitle: "Insert data",
                    personal: req.body
                });
            }
            else
                console.log('Error insertion'+ err);
        }
    });

}

//update function
function updateRecord(req, res){
    Personal.findOneAndUpdate({ 
        _id: req.body._id 
    }, 
    req.body, { 
        new: true 
    }, 
    (err, doc) => {
        if (!err) {
            res.redirect('personal/personallist');
        }
        else{
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("personal/addOrEdit", {
                    viewTitle: 'Update Personal',
                    personal: req.body
                });
            }
            else
                console.log('Update Error:' + err);
        }

    });
}

router.get('/personallist',(req, res) => {
    Personal.find((err, docs) =>{
        if (!err){
            res.render("personal/personallist", {
                personallist: docs
            });
        }

    });
});
//check error
function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Personal.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("personal/addOrEdit", {
                viewTitle: "Update Personal",
                personal: doc
            })
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Personal.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err){
            res.redirect('/personal/personallist');
        }
        else {
            console.log('Error delete:'+err);
        }
    });
});

module.exports = router;