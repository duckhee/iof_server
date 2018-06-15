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
//setting IoF setting controller
var IoFSettingController = require('../../controllers/device/IoF_Setting_controller');


//show device index page
router.get('/', function(req, res, next) {
    console.log('device root router');
    res.redirect('/device/list');
});

//registe page get router 
router.get('/registe', function(req, res, next) {
    console.log('middel ware test !! need limit device num and check user info');
    next();
})

//registe page get router
router.get('/registe', function(req, res, next) {
    console.log('need get apikey and serial');
    var user_info = { id: req.session.userid };
    if (user_info) {
        user_controller.find_info(user_info, function(err, row) {
            if (err) {
                console.log('error ::: ', err);
                next(err);
            } else {
                var device_info = { apikey: row.apikey };
                device_controller.count_device(device_info, function(err, result) {
                    if (err) {
                        console.log('device counter error ::::::::::::: ', err);
                        next(err);
                    } else {
                        console.log('device count success :::::::::::::::::: ', result);
                        console.log('user info ::::::', row);
                        console.log('get apikey ::::: ', row.apikey);
                        var serial = row.apikey + util_make.createserial();
                        console.log('serial make :::: ', serial);
                        res.render('device/registePage', {
                            apikey: row.apikey,
                            serial: serial,
                            count: result
                        });
                    }
                });
            }
        });
    } else {
        res.redirect('/user/login');
    }
});

router.post('/process/registe', function(req, res, next) {
    var type = req.body.device_type || req.query.device_type || req.params.device_type || req.param.device_type;
    console.log("device type ::: ", type);
    next();
})

//registe page post router
router.post('/process/registe', function(req, res, next) {
    var name = req.body.device_name || req.query.device_name || req.params.device_name || req.param.device_name;
    var apikey = req.body.device_apikey || req.query.device_apikey || req.params.device_apikey || req.param.device_apikey;
    var serial = req.body.device_serial || req.query.device_serial || req.params.device_serial || req.param.device_serial;
    var address = req.body.device_address || req.query.device_address || req.params.device_address || req.param.device_address;
    var type = req.body.device_type || req.query.device_type || req.params.device_type || req.param.device_type;
    console.log("device type ::: ", type);
    var device_info = {
        "devivce_name": name,
        "device_apikey": apikey,
        "device_serial": serial,
        "device_address": address,
        "device_type": type
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
                "device_serial": row.device_serial,
                "device_apikey": row.device_apikey,
                "device_address": row.device_address,
                "id": row.id
            };
            network_controller.insert_network(network_info, function(err, rows) {
                if (err) {
                    console.log('network insert error ::::: ', err);
                    res.status(404);
                } else if (rows) {
                    console.log('inset network success');
                    if (type === 'IoF') {
                        var SettingInfo = {
                            "id": row.id,
                            "serial": row.device_serial,
                            "address": row.device_address,
                        }
                        IoFSettingController.DefaultSetting(SettingInfo, function(err, result) {
                            if (err) {
                                console.log('default setting iof error :::: ', err);
                                next(err);
                            } else {
                                console.log('setting success');
                                res.redirect('/device/list');
                            }
                        });
                    } else {
                        res.redirect('/device/list');
                    }

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
    var user_info = { id: req.session.userid };
    user_controller.find_info(user_info, function(err, result) {
        if (err) {
            console.log('device list middle ware error ::::::: ', err);
            next(err);
        } else if (result) {
            console.log('get user info success device list router get :::: ', result.apikey);
            req.query.apikey = result.apikey;
            next();
        } else {
            res.redirect('/device/registe');
        }
    });
});


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
            } else if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].device_network) {
                        console.log('serial :::::: ' + rows[i].dataValues.device_serial + 'i ::::::' + i + '  testing status :::::::::::::::' + rows[i].device_network.dataValues.sn_status);
                    }
                }
                res.render('device/listPage', {
                    devices: rows
                });

            } else {
                var rows = null;
                res.render('device/listPage', {
                    devices: rows
                });
            }
        });
    } else {
        var rows = null;
        res.render('device/listPage', {
            devices: rows
        });
    }
});

//device list page post router
router.post('/proccess/list', function(req, res, next) {
    console.log('device list post router');
    next();
});

//detail device get middleware router
router.get('/detail', function(req, res, next) {
    console.log('middleware router !!! detail ');
    var device_getid = req.query.id || req.body.id || req.params.id || req.param.id;
    var get_device_serial = { id: device_getid };
    device_controller.device_info(get_device_serial, function(err, result) {
        if (err) {
            console.log('device detail error ::::: ', err);
            next(err);
        } else {
            console.log('device detail data :::::: ', result);
            console.log('device type :::::: ', result.device_type);
            var device_serial = result.device_serial;
            req.query.serial = device_serial;

            next();
        }
    });

});

//chang view radon or iof
router.get('/detail', function(req, res, next) {
    var query_device_id = req.query.id || req.body.id || req.params.id || req.param.id;
    var device_serial = req.query.serial;
    device_controller.device_type(device_serial, function(err, result) {
        if (result.device_type === 'radon') {
            res.render('device/data/radon/detailPage', {
                serial: device_serial
            });
        } else if (err) {
            console.log('detail route middleware error :::: ', err);
            next(err);
        } else {
            req.query.devicetype = result.device_type;
            console.log('show page iof');
            next();
        }
    })
});

//detail page get router
router.get('/detail', function(req, res, next) {
    var query_device_id = req.query.id || req.body.id || req.params.id || req.param.id;
    var device_serial = req.query.serial;
    var deviceType = req.query.devicetype;
    console.log('get device type ::: ', deviceType);
    console.log('get id ::::: ', query_device_id);
    console.log('device serial :::::: ', device_serial);
    if (deviceType === 'IoF') {
        res.render('device/data/IoF/detailPage', { serial: device_serial });
    } else {
        console.log('next page');
        next();
    }
});

router.get('/detail', function(req, res, next) {
    var query_device_id = req.query.id || req.body.id || req.params.id || req.param.id;
    var device_serial = req.query.serial;
    var deviceType = req.query.devicetype;
    console.log('get device type ::: ', deviceType);
    console.log('get id ::::: ', query_device_id);
    console.log('device serial :::::: ', device_serial);
    res.json('not page');
})

//detail page post router
router.post('/process/detail', function(req, res, next) {
    next();
});


//modfiy page get middleware router
router.get('/modify', function(req, res, next) {
    console.log('modify middleware router');
    var query_device_id = req.query.id || req.body.id || req.params.id || req.param.id;
    var query_device_serial = req.query.serial || req.body.serial || req.params.serial || req.param.serial;

    next();
});


//modfiy page get router
router.get('/modfiy', function(req, res, next) {
    console.log('device modfiy get router');
    next();
});

//modfiy page post router
router.get('/process/modfiy', function(req, res, next) {
    console.log('device modfiy post router');
    next();
});

//setting device get router
router.get('/setting', function(req, res, next) {
    console.log('device setting get router');
    next();
});

//setting device post router
router.post('/setting', function(req, res, next) {
    console.log('device setting post router');
    next();
})
module.exports = router;