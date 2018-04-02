var network_controller = require('./controllers/device/network_controller');
var device_controller = require('./controllers/device/device_controller');
var network_info = {};

device_controller.num_device(function(err, row) {
    if (err) {
        console.log('error ; ', err);
        process.exit();
    } else {
        console.log('rows :::::: ', row); //only count 
        process.exit();
    }
})

/*
network_controller.check_network(network_info, function(err, row) {
    if (err) {
        console.log('error ::::::: ', err);
        process.exit();
    } else {
        console.log('row typedof :::::', typeof(row));
        console.log('row :::::::  ', row);
        process.exit();
    }
});

*/