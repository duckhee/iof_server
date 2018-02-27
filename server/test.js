var setting_controller = require('./controllers/device/device_setting_controller');
var data_controller = require('./controllers/device/data_controller');
var camera_controller = require('./controllers/device/image_controller');
var network_controller = require('./controllers/device/network_controller');
var device_controller = require('./controllers/device/device_controller');
var boarder_controller = require('./controllers/board/board_controller');

var network_info = {apikey:"DQ91h8BGCTLizop"};


device_controller.check_network(network_info, function(err, row){
    if(err){
        console.log('net work error :::: ', err);
        process.exit();
    }else{
        
        process.exit();
    }
});

