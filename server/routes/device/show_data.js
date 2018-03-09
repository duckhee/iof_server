var express = require('express');
var router = express.Router();

//ajax get data 
router.get('/get_data_ajax', function(req, res, next) {
    next();
});

//router get image
router.get('/get_image_ajax', function(req, res, next) {
    next();
});

//send coommand ?? 
router.get('/command_ajax', function(req, res, next) {
    next();
});


module.exports = router;