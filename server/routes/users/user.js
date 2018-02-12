var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var custom_util = require('../../util/util'); //create apikey
var user_controller = require('../../controllers/user/user_controller');

//registe user page
router.get('/registe', function(req, res, next) {
    console.log('registe page router');
    res.render('user/registe_page');
});
//registe user page post process
router.post('/process/registe', function(req, res, next) {
    consoel.log('registe post router');
    
    var userid = req.body.id || req.query.id || req.param.id || req.params.id;
    var userpw = req.body.pw || req.query.pw || req.param.pw || req.params.pw;
    var username = req.body.name || req.query.name || req.param.name || req.params.name;
    var userphone1 = req.body.phone1 || req.query.phone1 || req.param.phone1 || req.params.phone1;
    var userphone2 = req.body.phone2 || req.query.phone2 || req.param.phone2 || req.params.phone2;
    var userphone3 = req.body.phone3 || req.query.phone3 || req.param.phone3 || req.params.phone3;
    var useraddress1 = req.body.address1 || req.query.address1 || req.param.address1 || req.params.address1;
    var useraddress2 = req.body.address2 || req.query.address2 || req.param.address2 || req.params.address2;
    
    var user_info = {
        user_id:userid,
        user_pw:userpw, 
        user_name:username,
        user_phone1:userphone1,
        user_phone2:userphone2,
        user_phone3:userphone3,
        user_address1:useraddress1,
        user_address2:useraddress2
    };


});

//router ajax user id check page
router.get('/check_id', function(req, res, next) {
    //get query id 
    var id = req.query.id || req.body.id || req.param.id || req.params.id;
    var user_info = {
        user_id:id
    };
    user_controller.check_id(user_info, function(err, row){
        if(err){
            console.log('error : ', err);
             res.json(err);
        }else if(row)
        {
            console.log('check id : ',row);
             res.json(row);
        }
    });
});

//router login page
router.get('/login', function(req, res, next) {
    res.render('user/login_page');
});

//router login post process
router.post('/process/login', function(req, res, next) {
    console.log('login post router');
    var userid = req.query.id || req.body.id || req.params.id || req.param.id;
    var userpw = req.query.pw || req.body.pw || req.params.pw || req.param.pw;

    var user_info = {
        user_id :userid,
        user_pw:userpw
    };

    user_controller.login(user_info, function(err, row){
        if(err){
             res.redirect('/user/login');
        }else if(row)
        {
             res.redirect('/');
        }else
        {
             res.redirect('/use/login');
        }
    });
    
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