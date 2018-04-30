var express = require('express');
var router = express.Router();

var DeviceController = require('../../../controllers/device/device_controller');
var SettingDevice = require('../../../controllers/device/device_setting_controller');
var SettingIoF = require('../../../controllers/device/IoF_Setting_controller');


router.get('/IoFsetSetting', function(req, res, next){
    var device_id = req.body.id || req.query.id || req.param.id || req.params.id;
    var DeviceInfo = {
        "id":device_id
    };
    DeviceController.device_info(DeviceInfo, function(err, result){
        if(err){
            console.log('insert device error :::: ', err);
            next(err);
        }else{
            console.log('checking device :::: ', result);
            req.query.serial = result.device_serial;
            next();
        }
    });
});

//setting iof device 
router.get('/IoFsetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();    
});

//seting iof device
router.get('/IoFsetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();
});

//post setting iof device
router.post('/IoFsetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();
});

//post setting iof device
router.post('/IoFsetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();
});

//get setting iof device
router.get('/IoFgetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();
});

//get setting iof device
router.get('/IoFgetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();
});

//post get setting iof device
router.post('/IoFgetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();
});

//post get setting iof device
router.post('/IoFgetSetting', function(req, res, next){
    var serial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    next();
});



return router;

