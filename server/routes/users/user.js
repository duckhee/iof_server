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
    console.log('registe post router');

    var phone_number = new Array;

    var userid = req.body.id || req.query.id || req.param.id || req.params.id;
    var userpw = req.body.password || req.query.password || req.param.password || req.params.password;
    var useremail = req.body.email || req.query.email || req.param.email || req.params.email;
    var username = req.body.name || req.query.name || req.param.name || req.params.name;
    var userphone = req.body.phone || req.query.phone || req.param.phone || req.params.phone;

    phone_number = custom_util.phone_number(userphone);

    var useraddress1 = req.body.address1 || req.query.address1 || req.param.address1 || req.params.address1;
    var useraddress2 = req.body.address2 || req.query.address2 || req.param.address2 || req.params.address2;
    var userzipcode = req.body.zipcode || req.query.zipcode || req.param.zipcode || req.params.zipcode;
    var apikey = custom_util.createApikey(userid);

    var user_info = {
        user_id: userid,
        user_pw: userpw,
        user_name: username,
        user_email: useremail,
        user_phone1: phone_number[0],
        user_phone2: phone_number[1],
        user_phone3: phone_number[2],
        user_address1: useraddress1,
        user_address2: useraddress2,
        user_zipcode: userzipcode,
        user_apikey: apikey
    };
    user_controller.create_user(user_info, function(err, newuser, olduser) {
        if (err) {
            console.log('create user error : ', err);

        } else if (olduser === true) {
            res.redirect('/');
        } else if (newuser) {
            res.redirect('/user/registe');
        } else {
            res.redirect('/user/registe');
        }
    });

});

//router ajax user id check page
router.get('/check_id', function(req, res, next) {
    //get query id 
    var id = req.query.id || req.body.id || req.param.id || req.params.id;
    var user_info = {
        user_id: id
    };
    user_controller.check_id(user_info, function(err, row) {
        if (err) {
            console.log('error : ', err);

            res.redirect('/user/check_id?id=' + userid);
        } else if (row) {
            console.log('check id : ', row);
            res.json(row);
        } else {
            console.log('null');
            res.json(false);
        }
    });
});

//check email ajax router
router.get('/check_email', function(req, res, next) {
    var email = req.query.emial || req.body.email || req.param.email || req.params.email;
    var user_info = {
        user_email: email
    };
    user_controller.check_email(user_info, function(err, row) {
        if (err) {
            console.log('check email error : ', err);
        } else if (row) {
            console.log('check email : ', row);
            res.json(row);
        } else {
            res.json(false);
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
    var userid = req.query.email || req.body.email || req.params.email || req.param.email;
    var userpw = req.query.password || req.body.password || req.params.password || req.param.password;

    //var testing=bcrypt.hashSync(userpw, bcrypt.genSaltSync(10), null);
    //console.log(testing);

    var user_info = {
        user_id: userid,
        user_password: userpw
    };
    console.log('login user info ::::::::::::: ', user_info);

    user_controller.login(user_info, function(err, row, check) {
        if (err) {
            res.redirect('/user/login');
        } else if (row) {
            req.session.userid = row.user_id;
            res.redirect('/');
        } else if(check === 0){
            console.log('test not id');
            res.send('<script>alert("not user go to registe page"); document.location.href ="/user/registe"</script>');
        }else if(check === 1){
            console.log('test not pw');
            res.send('<script>alert("not match password"); document.location.href ="/user/login"</script>');
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

//router logout
router.get('/logout', function(req, res, next) {
    console.log('logout router get');
    req.session.destroy(function() {
        req.session;
    });
    res.redirect('/');
})

module.exports = router;