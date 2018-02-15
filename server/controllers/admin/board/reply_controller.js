var models = require('../../models/index');
var tbl_reply = require('../../models//tbl_reply');

/*
    create reply
    update reply
    destroy reply
    select reply
    select list reply
*/

//create reply
exports.create_reply = function(reply_info, callback) {
    models.tbl_reply.create({

    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//update reply
exports.update_reply = function(reply_info, callback) {
    models.tbl_reply.udpate({

    }, {
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//detail reply one
exports.select_reply = function(reply_info, callback) {
    models.tbl_reply.find({
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//reply list 
exports.list_reply = function(reply_info, callback) {
    models.tbl_reply.findAll({
        where: {

        }
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
};