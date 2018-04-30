var express = require('express');
var router = express.Router();

var DeviceController = require('../../../controllers/device/device_controller');
var SettingDevice = require('../../../controllers/device/device_setting_controller');
var SettingIoF = require('../../../controllers/device/IoF_Setting_controller');

module.exports = function(io, socket){

    
//checking device get router
router.get('/ajaxpumpon', function(req, res, next){
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
            console.log('event water start');
            socket.on('finshpumpon_'+result.device_serial, function(data){
                if(data.flag === 1){
                     res.json('pump start success');
                }else{
                     res.json('pump start failed');
                }
            });
        }
    });
});

/*
//start pump on
router.get('/ajaxpumpon', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    next();
    
});

//get pump on
router.get('/ajaxpumpon', function(req, res, next){

});

*/

//start pump post
router.post('/ajaxpumpon', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    next();
});

//start pump post
router.post('/ajaxpumpon', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    next();
});

//start pump post
router.post('/ajaxpumpon', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    next();
});

//get pump off
router.get('/ajaxpumpoff', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    next();
});

//get pump off
router.get('/ajaxpumpoff', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    var DeviceInfo = {
        "serial":getserial, 
    }
    DeviceController.insert_before(DeviceInfo, function(err, result){
        if(err){
            console.log('pump off before checking error :::::: ', err);
            next(err);
        }else{
            console.log('find device :::::: ', result);
            var Info = {
                "serial":result.device_serial,
                "cmd":data.command
            }
            io.emit('waterstop', Info);
            console.log('event water stop');
            socket.on('finshpumpstop_'+result.device_serial, function(data){
                if(data.flag === 1){
                     res.json('pump off success');
                }else{
                     res.json('pump off failed');
                }
            });
        }
    });
    
});

//capture picture router
router.get('ajaxshooting', function(req, res, next){
    var getserial = req.body.serial || req.query.serial || req.param.serial || req.params.serial;
    var getcommand = req.body.command || req.query.command || req.param.command || req.params.command;
    var DeviceInfo = {
        "serial":getserial
    }
    DeviceController.insert_before(DeviceInfo, function(err, result){
        if(err){
            console.log('insert before checking shooting error :::: ', err);
        }else{
            console.log('device find :::: ', result);
            var Info = {
                "serial":result.device_serial,
                "cmd":getcommand
            };
            io.emit('camerashoot', Info);
            console.log('camera shooting ');
            socket.on('finshshooting_'+result.device_serial, function(data){
                if(data.flag === 1){
                    console.log('shooting picture sucess');
                     res.json('shooting picture success');
                }else{
                    console.log('shooting picture failed');
                     res.json('shooting picture failed');
                }
            });
        }
    });
});

//capture picture router
router.get('ajaxshooting', function(req, res, next){
    next();
});

//capture picture router
router.get('ajaxshooting', function(req, res, next){
    next();
});

//capture picture router
router.post('ajaxshooting', function(req, res, next){
    next();
});

//capture picture router
router.post('ajaxshooting', function(req, res, next){
    next();
});

//capture picture router
router.post('ajaxshooting', function(req, res, next){
    next();
});
//get pump off
router.get('/ajaxpumpoff', function(req, res, next){
    next();
});

//get pump off
router.post('/ajaxpumpoff', function(req, res, next){
    next();
});

//get pump off
router.post('/ajaxpumpoff', function(req, res, next){
    next();
});

//get pump off
router.post('/ajaxpumpoff', function(req, res, next){
    next();
});


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

}