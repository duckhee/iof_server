var mailer = require('nodemailer');
var config = require('../config.json');
var transporter = mailer.createTransport(config.mail);
var server_error = 'server error report : ';
var connection_info = 'device connection report : ';

var mail_option = {
    from: 'IOF Server report <' + config.mail.auth.user + '>',
    to: 'iof@candh.co.kr',
    subject: 'server error report'
};
//check network connection module
//var check = require('../../Server/controllers/connection_controller');


//error 발생시에 에러 정보를 받아서 전송을 해준다. callback(info, err);
exports.send_error = function(err_data, callback) {
    server_error += err_data;
    mail_option.text = server_error;
    transporter.sendMail(mail_option, function(err, info) {
        if (err) {
            console.log("could not send report : ");
            console.log(server_error);
            transporter.close();
            callback(null, err);
        } else if (info) {
            console.log("message %s and :%s", info.messageId, info.response);
            transporter.close();
            callback(info, null);

        } else {
            console.log('null');
            callback(null, null);
        }
    });
};

//connection에 대한 메일 보고 하는 것 callback(send info, err);
exports.send_connection = function(callback) {
    check.check_network(function(row, err) {
        if (err) {
            console.log('error : ', err.stack);
            server_error += err.stack;
            mail_option.text = server_error;
            transporter.sendMail(mail_option, function(err, info) {
                if (err) {
                    console.log("could not send report : ");
                    console.log(server_error);
                    transporter.close();
                    callback(err);
                } else if (info) {
                    console.log("message %s and :%s", info.messageId, info.response);
                    transporter.close();
                    callback(null);
                } else {
                    console.log('null');
                    callback(null);
                }
            });
        } else if (row) {
            connection_info += 'device serial : ' + row.serial + ', device last connection time : ' + row.createdAt;
            mail_option.text = connection_info;
            transporter.sendMail(mail_option, function(err, info) {
                if (err) {
                    console.log("could not send report : ");
                    console.log(server_error);
                    transporter.close();
                    callback(err);
                } else if (info) {
                    console.log("message %s and :%s", info.messageId, info.response);
                    transporter.close();
                    callback(null);
                } else {
                    console.log('null');
                    callback(null);
                }
            })
        } else {
            console.log('null');
            callback(null);
        }
    });
};