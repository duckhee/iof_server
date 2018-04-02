var report_email = require('./report/report');
var config = require('./config.json');
var fs = require('fs');
var mysql = require('mysql');


//따로 설정을 해주어서 돌린다.(single thread를 사용하지 않고, 리눅스 스케줄 관리로 실행 )

var mail_option = {
    from: 'IOF Server report <' + config.mail.auth.user + '>',
    to: 'fain9301@yahoo.com',
    subject: 'server error report'
};

var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'won1228',
    port: '3306',
    database: 'database_development'
}

var pool = mysql.createPool(db_config);

//get serial
exports.get_serial = function(callback) {
    console.log('serial get');

    pool.getConnection((err, conn) => {
        if (err) {
            console.log('get device serial num :::::::::: ', err);
            if (conn) {
                conn.release();
            }
            callback(err, null);
        } else {
            conn.query('select device_serial from devices group by device_serial', function(err, result) {
                if (err) {
                    console.log('select device query error :::::: ', err);
                    conn.release();
                    callback(err, null);
                } else {
                    console.log('device serial get :::::: ', result);
                    callback(null, result);
                }
            });
        }
    });
};

//status change check
exports.status_change = function(serial, callback) {
    console.log('testing');
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('connectiong pool error ::::: ', err);
            if (conn) {
                conn.release();
            }
            //process.exit();
            callback(err, null);
        } else {
           
            //var serial = "dxp2I9QRb3OwRevMF0Fx";
            var serial = serial;
            //console.log('get connection ::::: ', conn);
            conn.query("update device_networks set sn_status= ?, updatedAt=NOW() where sn_serial = ?", ['inactive', serial], function(err, result) {
                if (err) {
                    console.log('query error :::::::: ', err);
                    conn.release();
                    //process.exit();
                    callback(err, null);
                } else {
                    console.log('update data :::::: ', result);
                    conn.release();
                    //process.exit();
                    callback(null, result);
                }
            })
        }
    })
};

//seelct from one day connection query
// select * from devices where updatedAt >= (CURRENT_TIMESTAMP() - INTERVAL 1 DAY);

//get status
exports.get_status = function(callback) {
    //var time_now;
    //var time_data;
    //time_now = new Data();

    pool.getConnection((err, conn) => {
        if (err) {
            console.log('get status connection error :::::::: ', err);
            if (conn) {
                conn.release();
            }
            //process.exit();
            callback(err, null);
        } else {
            conn.query('select sn_status, sn_serial from device_networks where updatedAt <= (CURRENT_TIMESTAMP() - INTERVAL 1 DAY) and sn_status="inactive"', [], function(err, result) {
                if (err) {
                    console.log('querry error ::::::::::: ', err);
                    conn.release();
                    //process.exit();
                    callback(err, null);
                } else {
                    console.log('select list status and serial :::::::::::: ', result);
                    conn.release();
                    //process.exit();
                    callback(null, result);
                }
            });
        }
    });
}


/*

//mail로 연결상태 알려주고, 하루가 지났을 경우 inactive로 상태 변경

pool.getConnection(function(err, connect){
    if(err){
        connect.release();
        process.exit();
    }else{
        connect.query('select * from device_networks', function(err, result){
            if(err){
                connect.release();
                process.exit();
            }else{
                
                console.log(result);
                console.log(result[0].createdAt);
                connect.release();
                process.exit();
            }
        })
    }
})


/*

var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'won1228',
    database:'database_development'
});

conn.connect();




conn.query('select * from device_networks', function(err, result, filed){
    if(err){
        
        process.exit();
    }else{
        console.log(result);
        console.log(result[0].updatedAt);
        console.log(result[0].id);
        process.exit();
    }
})
    
*/