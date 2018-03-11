var express = require('express');
var router = express.Router();

var device_controller = require('../../../controllers/device/device_controller');
var network_controller = require('../../../controllers/device/network_controller');
var data_controller = require('../../../controllers/device/data_controller');

//router root data
router.get('/', function(req, res, next) {
    /// next();
    res.redirect('/');
});


//router insert data
router.get('/insert', function(req, res, next) {
    var query_apikey = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var insert_data = req.query.value || req.params.value || req.body.value || req.param.value;
    var apikey_info = {
        apikey: query_apikey,
    };

    device_controller.insert_before(apikey_info, function(err, row) {
        if (err) {
            console.log('insert before data error ::: ', err);
            res.json('failed');
        } else if (row) {
            console.log('inset before data success :::::', row.id);
            var data_info = {
                data: insert_data,
                apikey: query_apikey,
                device_id: row.id,
                serial: query_apikey,
                sd_address: row.address
            }
            data_controller.insert_value(data_info, function(err, row) {
                if (err) {
                    res.status(404);
                } else {
                    network_controller.update_actstatus(data_info, function(err, result) {
                        if (err) {
                            console.log('updateing active network error ::::: ', err);
                            res.status(404);
                        } else {
                            console.log('success updating network set ::::: ', result);
                            res.json('success');
                        }
                    })

                }
            });
        } else {
            res.status(500);
        }
    });

});


//router insert data
router.post('/insert', function(req, res, next) {
    var query_apikey = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var insert_data = req.query.value || req.params.value || req.body.value || req.param.value;
    var apikey_info = {
        apikey: query_apikey,
    };

    device_controller.insert_before(apikey_info, function(err, row) {
        if (err) {
            console.log('insert before data error ::: ', err);
            res.json('failed');
        } else if (row) {
            console.log('inset before data success :::::', row.id);
            var data_info = {
                data: insert_data,
                apikey: query_apikey,
                device_id: row.id,
                serial: query_apikey,
                sd_address: row.address
            }
            data_controller.insert_value(data_info, function(err, row) {
                if (err) {
                    res.status(404);
                } else {
                    network_controller.update_actstatus(data_info, function(err, result) {
                        if (err) {
                            console.log('updateing active network error ::::: ', err);
                            res.status(404);
                        } else {
                            console.log('success updating network set ::::: ', result);
                            res.json('success');
                        }
                    })

                }
            });
        } else {
            res.status(500);
        }
    });
});

//router ajax get data json
router.get('/ajaxget', function(req, res, next) {
    var query_apikey = req.query.apikey || req.params.apikey || req.body.apikey || req.param.apikey;
    var apikey_info = { apikey: query_apikey };

    device_controller.check_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);

            //data insert info
            data_controller.list10_value(apikey_info, function(err, rows) {
                if (err) {
                    console.log('get data error :::::: ', err);
                    next(err);
                } else {
                    console.log('list limit 10 :::::: ', rows);
                    res.json(rows);
                }
            });

        }
    });
});

//router ajax post data json
router.post('/ajaxget', function(req, res, next) {
    var query_apikey = req.query.apikey || req.params.apikey || req.body.apikey || req.param.apikey;
    var apikey_info = { apikey: query_apikey };

    device_controller.check_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);

            //data list info
            data_controller.list10_value(apikey_info, function(err, rows) {
                if (err) {
                    console.log('get data error :::::: ', err);
                    next(err);
                } else {
                    console.log('list limit 10 :::::: ', rows);
                    res.json(rows);
                }
            });

        }
    });
});

module.exports = router;