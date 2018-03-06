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
    var device_name = req.body.device_name || req.query.device_name || req.params.device_name || req.param.device_name;
    var device_apikey = req.bodt.device_apikey || req.query.device_apikey || req.params.device_apikey || req.param.device_apikey;

    next();
});

//router device list set middleware
router.get('/list', function(req, res, next) {
    console.log('testing !! middleware');


    req.query.apikey = 'DQ91h8BGCTLizop'; // set and send apikey next router 

    next();


})


//device list page get router
router.get('/list', function(req, res, next) {
    console.log('device list get router');
    var apikey = req.query.apikey || req.body.apikey || req.params.apikey || req.param.apikey;
    var apikey_info = {
        apikey: apikey
    };
    if (apikey) {
        network_controller.check_network(apikey_info, function(err, rows) {
            if (err) {
                console.log('device list router error  : ', err);
                next(err);
            } else {

                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].device_network) {

                        console.log('serial :::::: ' + rows[i].dataValues.device_serial + 'i ::::::' + i + '  testing status :::::::::::::::' + rows[i].device_network.dataValues.sn_status);
                    }
                }

                res.render('device/listPage', {
                    devices: rows
                });
            }

        });
    } else {
        var rows = null;
        res.render('device/listPage', {
            devices: rows
        })
    }
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