var express = require('express');
var router = express.Router();

var device_controller = require('../../../controllers/device/device_controller');
var network_controller = require('../../../controllers/device/network_controller');
var data_controller = require('../../../controllers/device/data_controller');

//router root data
router.get('/', function(req, res, next) {
    next();
});


//router insert data
router.get('/insert', function(req, res, next) {
    var query_apikey = req.query.apikey || req.params.apikey || req.body.apikey || req.param.apikey;
    var data_value = req.body.value || req.params.value || req.query.value || req.param.value;
    var apikey_info = { apikey: query_apikey };
    var insert_data = {};
    device_controller.check_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);
            insert_data = {
                deviceId: result,
                apikey: query_apikey,
                value: data_value
            };
            data_controller.insert_value(insert_data, function(err, row) {

            });
        }
    });

});


//router insert data
router.post('/insert', function(req, res, next) {
    var query_apikey = req.query.apikey || req.params.apikey || req.body.apikey || req.param.apikey;
    var data_value = req.body.value || req.params.value || req.query.value || req.param.value;
    var apikey_info = { apikey: query_apikey };
    var insert_data = {};
    device_controller.check_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);

            //data insert info
            insert_data = {
                deviceId: result,
                apikey: query_apikey,
                value: data_value
            };
            data_controller.insert_value(insert_data, function(err, row) {
                if (err) {
                    console.log('insert data error :::::: ', err);
                    next(err);
                } else {
                    console.log('insert success ::::::', row);
                    res.json('success'); //example send json 
                }
            });
        }
    });

});


module.exports = router;