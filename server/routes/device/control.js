var express = require('express');
var router = express.Router();

var DeviceController = require('../../controllers/device/device_controller');
var SettingDevice = require('../../controllers/device/device_setting_controller');
var SettingIoF = require('../../controllers/device/IoF_Setting_controller');

var io2 = require('socket.io-client');
var socket2 = io2.connect('http://localhost:5001');


/*
    router.get('/test', function(req, res, next) {
        //console.log('tesitng socket');
        var TestingData = {
            "serial":'tsetasdfdka'
        }
        socket2.emit('finshpumpon_tesitng', TestingData);
         res.json('test');
        socket2.on('testingsocket', function(data){
            console.log('testing get dtata' , data);
        })
    });
*/  
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
            socket2.emit('waterstart',Info);
            console.log('event water start');
            socket2.on('finshpumpon_'+result.device_serial, function(data){
                if(data.flag === 1){
                    console.log('pump on success');
                     res.json('pump start success');
                }else{
                    console.log('pump on failed');
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
            socket2.emit('waterstop', Info);
            console.log('event water stop');
            socket2.on('finshpumpstop_'+result.device_serial, function(data){
                if(data.flag === 1){
                    console.log('pump off success');
                     res.json('pump off success');
                }else{
                    console.log('pump off failed');
                     res.json('pump off failed');
                }
            });
        }
    });
    
});

//get pump off
router.get('/ajaxpumpoff', function(req, res, next){
    var getserial = req.query.serial || req.body.serial || req.param.serial || req.params.serial;
    var getcommand = req.query.command || req.body.command || req.param.command || req.params.command;
    var DeviceInfo = {
        "serial":getserial,
        "command":getcommand
    };
    DeviceController.insert_before(DeviceInfo, function(err, result){
        if(err){
            console.log('device find error ::::: ', err);

        }else{
            console.log('device find result ::::: ', result);
            
            
        }
    })
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
            socket2.emit('camerashoot', Info);
            console.log('camera shooting ');
            socket2.on('finshshooting_'+result.device_serial, function(data){
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

module.exports = router;

