var config = require('./config.json');
var mysql = require('mysql');


var conn = mysql.createConnection(config.db.development);

conn.connect();




conn.query('select * from device_networks', function(err, result, filed) {
    if (err) {
        console.log('error', err);
        process.exit();
    } else {
        console.log(result);
        console.log(result[0].updatedAt);
        console.log(result[0].id);
        process.exit();
    }
})