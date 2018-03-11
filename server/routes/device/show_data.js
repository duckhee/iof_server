var express = require('express');
var router = express.Router();

var data_controller = require('../../controllers/device/data_controller');
var image_controller = require('../../controllers/device/image_controller');

//ajax get data 
router.get('/get_data_ajax', function(req, res, next) {
    next();
});

router.get('/get_data_ajax', function(req, res, next) {

});

//router get image
router.get('/get_image_ajax', function(req, res, next) {
    console.log('testing image path middleware');
    next();
});

//router get image
router.get('/get_image_ajax', function(req, res, next) {

    var image_info = {};

    image_controller.find_image(image_info, function(err, result) {

    });
    next();
});

//send coommand ?? 
router.get('/command_ajax', function(req, res, next) {
    next();
});


module.exports = router;