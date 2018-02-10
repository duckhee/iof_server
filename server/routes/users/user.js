var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

var user_controller = require('../../controllers/user/user_controller');

//registe user page
router.get('/registe', function(req, res, next) {
    console.log('registe page router');
    res.render('user/registe_page');
});
//registe user page post process
router.post('/process/registe', function(req, res, next) {
    next();
});

//router ajax user id check page
router.get('/check/id', function(req, res, next) {

});

//router login page
router.get('/login', function(req, res, next) {
    res.render('user/login_page');
});

//router login post process
router.post('/process/login', function(req, res, next) {
    next();
});

//router profile page
router.get('/profile', function(req, res, next) {
    res.render('user/profile_page');
});

//router profile post process
router.post('/process/profile', function(req, res, next) {
    next();
});

module.exports = router;