const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport')
const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false});
const passportJWT = passport.authenticate('jwt', {session: false});
const products = require('../controllers/product');
const businessdata = require('../controllers/business');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/secret')
    .get(passportJWT, UsersController.secret);

router.route('/products')
    .post(passportJWT, products.create);

router.route('/products')
    .get(passportJWT, products.findAll);

router.route('/products/:productId')
    .get(passportJWT, products.findOne);

router.route('/products/:productId')
    .put(passportJWT, products.update);

router.route('/products/:productId')
    .delete(passportJWT, products.delete);

router.route('/item/add')
    .post(passportJWT, businessdata.add);

router.route('/item')
    .get(passportJWT, businessdata.showall);
  
router.route('/item/edit/:id')
    .get(passportJWT, businessdata.edit);

router.route('/item/update/:id')
    .put(passportJWT, businessdata.update);

router.route('/item/delete/:id')
    .delete(passportJWT, businessdata.remove);


module.exports = router;
