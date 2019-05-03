const JWT = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../configuration')

signToken = user => {
    return JWT.sign({
        iss: 'CodeWorker',
        sub: user._id,
        iat: new Date().getTime(),//current time 
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);

}

module.exports = {
    signUp: async (req, res, next) => {

      const { email, password } = req.value.body;
      const foundUser = await User.findOne({ email: email});
      if (foundUser){ 
          return res.status(403).send({ error: 'email is already in use'})
        }
      const newUser = new User({ email, password });
      await newUser.save();
      
      //respond
      const token = signToken(newUser);
      //res.json({ user: 'created '});
      res.status(200).json({ token });
    },

    signIn: async (req, res, next) => {
        //console.log('req.user', req.user);
        const token = signToken(req.user);
        res.status(200).json({ token });

        //console.log("successful");
    },

    secret: async (req, res, next) => {
      res.json({ secret: "resource"})
    },

    item: async (req, res, next) => {
      res.json({"message":"Welcome to item"});
    }
}