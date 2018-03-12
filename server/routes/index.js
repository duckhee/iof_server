var express = require('express');
var router = express.Router();


//router all through here middle ware
router.all('/*', function(req, res, next) {
    console.log('root path all router');
    console.log('request ip : ', req.ip);
    console.log('request url : ', req.originalUrl);
    console.log('session user id :::::::::::: ', req.session.userid);
    next();
})

//router login check
router.all('/device/*', function(req, res, next){
    if(!req.session.userid){
        console.log('not login user');
        res.send('<script>alert("not login go to login page"); document.location.href ="/user/login"</script>');
    }else{
        console.log('login user');
         next();
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;