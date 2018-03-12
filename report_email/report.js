var report_email = require('./report/report');
//var checking = require('../server/controllers/device/network_controller');

var mysql = require('mysql');


var mail_option = {
    from: 'IOF Server report <' + config.mail.auth.user + '>',
    to: 'fain9301@yahoo.com',
    subject: 'server error report'
};





var pool = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'won1228',
    database:'database_development'
});

pool.connect();


pool.query('select * from device_networks', function(err, result, filed){
    if(err){
        
        process.exit();
    }else{
        console.log(result);
        console.log(result[0].updatedAt);
        console.log(result[0].id);
        process.exit();
    }
})
    

