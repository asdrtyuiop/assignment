const Business = require('../models/business');

// Defined get data(index or listing) route
exports.showall = (req, res) => {
    Business.find(function(err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
};

// Defined store route
exports.add = (req, res) => {
    let business = new Business(req.body);
    business.save()
      .then(business => {
        res.status(200).json({'business': 'business in added successfully'});
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  };

  // Defined edit route
exports.edit = (req, res) => {
    let id = req.params.id;
    Business.findById(id, function (err, business){
        res.json(business);
    });
};
  

  //  Defined update route
  exports.update = (req, res) => {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.title = req.body.title;
        business.description = req.body.description;
        business.price = req.body.price;

        business.save().then(business => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
};

// Defined delete | remove | destroy route
exports.remove = (req, res) => {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
};