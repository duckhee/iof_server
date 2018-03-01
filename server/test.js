var network_controller = require('./controllers/device/network_controller');

var network_info = {};
network_controller.check_network(network_info, function(err, row) {
    if (err) {
        console.log('error ::::::: ', err);
        process.exit();
    } else {
        console.log('row :::::::  ', row);
        process.exit();
    }
});