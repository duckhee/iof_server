var express = require('express');
var router = express.Router();

var fs = require('fs');
var downloader = require('../../util/file');
var util_make = require('../../util/util');

var setting_controller = require('../../controllers/device/device_setting_controller');
var data_controller = require('../../controllers/device/data_controller');
var camera_controller = require('../../controllers/device/image_controller');
var network_controller = require('../../controllers/device/network_controller');


//show device index page
router.get('/', function(req, res, next){
    res.render('device/listPage');
});

//registe page get router
router.get('/registe', function(req, res, next){
    res.render('device/reigstePage');
});

//registe page post router
router.post('/process/registe', function(req, res, next){
    next();
});

//device list page get router
router.get('/list', function(req, res, next){
    console.log('device list get router'); 
    res.render('device/listPage');
});

//device list page post router
router.post('/proccess/list', function(req,res, next){
    console.log('device list post router');
    next();
});

//detail page get router
router.get('/detail', function(req, res, next){
    res.render('device/detailPage');
});

//detail page post router
router.post('/process/detail', function(req, res, next){
    next();
});

//modfiy page get router
router.get('/modfiy', function(req, res, next){
    res.render('device/modifyPage');
});

//modfiy page post router
router.get('/process/modfiy', function(req, res, next){
    next();
});

module.exports = router;
