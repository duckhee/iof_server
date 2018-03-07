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
var user_controller = require('../../controllers/user/user_controller');

//show device index page
router.get('/', function(req, res, next) {
    console.log('device root router');
    res.redirect('/device/list');
});

//registe page get router 
router.get('/registe', function(req, res, next) {
    console.log('middel ware test !! need limit device num');
    next();
})

//registe page get router
router.get('/registe', function(req, res, next) {
    console.log('need get apikey and serial');
    var user_info = { id: 'fain9301' };
    if (user_info) {
        user_controller.find_info(user_info, function(err, row) {
            if (err) {
                console.log('error ::: ', err);
                next(err);
            } else {
                console.log('user info ::::::', row);
                console.log('get apikey ::::: ', row.apikey);
                var serial = row.apikey + util_make.createserial();
                console.log('serial make :::: ', serial);
                res.render('device/registePage', {
                    apikey: row.apikey,
                    serial: serial
                });
            }
        });
    } else {
        res.json('not user info');
    }

});

//registe page post router
router.post('/process/registe', function(req, res, next) {
    var name = req.body.device_name || req.query.device_name || req.params.device_name || req.param.device_name;
    var apikey = req.body.device_apikey || req.query.device_apikey || req.params.device_apikey || req.param.device_apikey;
    var serial = req.body.device_serial || req.query.device_serial || req.params.device_serial || req.param.device_serial;
    var address = req.body.device_address || req.query.device_address || req.params.device_address || req.param.device_address;
    var device_info = {
        devivce_name: name,
        device_apikey: apikey,
        device_serial: serial,
        device_address: address
    };
    console.log('device name :::: ', name);
    console.log('device apikey :::: ', apikey);
    console.log('device serial :::: ', serial);
    console.log('device address :::: ', address);
    device_controller.insert_device(device_info, function(err, row) {
        if (err) {
            console.log('registe device error ::::: ', err);
            next(err);
        } else if (row) {
            console.log('success ::::::', row.id);
            var network_info = {
                device_serial: row.device_serial,
                device_apikey: row.device_apikey,
                id: row.id
            };
            network_controller.insert_network(network_info, function(err, row) {
                if (err) {
                    console.log('network insert error ::::: ', err);
                    res.status(404);
                } else if (row) {
                    console.log('succes');
                    res.redirect('/device/list');
                } else {
                    console.log('null');
                    res.status(500);
                }
            });
        } else {
            console.log('null');
            res.status(500);
        }
    });

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
        console.log('apikey :::: ', apikey);
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