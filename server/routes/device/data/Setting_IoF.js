var express = require('express');
var router = express.Router();

var DeviceController = require('../../../controllers/device/device_controller');
var SettingDevice = require('../../../controllers/device/device_setting_controller');
var SettingIoF = require('../../../controllers/device/IoF_Setting_controller');

module.exports = function(io, socket){

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

//checking device get router
router.get('/ajaxpump', function(req, res, next){
    console.log('checking device ');
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    var GetDeviceInfo = {
        "serial":getserial
    };
    DeviceController.insert_before(GetDeviceInfo, function(err, result){
        if(err){
            console.log('find device error :::::: ', err);
            next(err);
        }else{
            console.log('get device info ::: ', result);
            console.log('insert command get :::: ', getcommand);
            var Info = {
                "serial":result.device_serial,
                "command":getcommand
            }
            io.emit('waterstart',Info);
             res.json('start success');
        }
    });
});

/*
//start pump on
router.get('/ajaxpump', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    next();
    
});

//get pump on
router.get('/ajaxpump', function(req, res, next){

});

*/

return router;

}