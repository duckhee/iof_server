var express = require('express');
var router = express.Router();

var fs = require('fs');
var downloader = require('../../util/file');
var util_make = require('../../util/util');

var setting_controller = require('../../controllers/device/device_setting_controller');
var data_controller = require('../../controllers/device/data_controller');
var camera_controller = require('../../controllers/device/image_controller');
var network_controller = require('../../controllers/device/network_controller');
var device_controller = require('../../controllers/device/device_controller');

//show device index page
router.get('/', function(req, res, next) {
    console.log('device root router');
    res.redirect('/device/list');
});

//registe page get router
router.get('/registe', function(req, res, next) {
    res.render('device/reigstePage');
});

//registe page post router
router.post('/process/registe', function(req, res, next) {
    next();
});

//device list page get router
router.get('/list', function(req, res, next) {
    console.log('device list get router');
    var apikey_info = {};
    device_controller.list_device(apikey_info, function(err, rows) {
        if (err) {
            console.log('device list error : ', err);
            next(err);

            /*}else if(row){
                console.log('success');
                console.log(row);
                
                res.render('device/listPage',{
                    devices:row
                });
                
               //res.render('device/listPagebackup');
            }else{
                console.log('null');
                res.redirect('/device/list');
            }
            */
        } else {
            console.log('testing ', rows);
            res.render('device/listPage', {
                devices: rows
            });
        }

    });

});

//device list page post router
router.post('/proccess/list', function(req, res, next) {
    console.log('device list post router');
    next();
});

//detail page get router
router.get('/detail', function(req, res, next) {
    res.render('device/detailPage');
});

//detail page post router
router.post('/process/detail', function(req, res, next) {
    next();
});

//modfiy page get router
router.get('/modfiy', function(req, res, next) {
    res.render('device/modifyPage');
});

//modfiy page post router
router.get('/process/modfiy', function(req, res, next) {
    next();
});

module.exports = router;