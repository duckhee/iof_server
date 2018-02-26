var network_test = require('./server/controllers/device/network_controller');

network_test.check_network(function(err, rows) {
    if (err) {
        console.log('error :', err);
    } else if (rows) {
        console.log('rows', rows);
    } else {
        console.log('null');
    }
});

network_test.test(function(err, row) {
    if (err) {
        console.log('error :', err);
    } else if (rows) {
        console.log('rows', rows);
    } else {
        console.log('null');
    }
});