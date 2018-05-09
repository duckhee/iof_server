var models = require('../../models/index');
var tbl_reply = require('../../models//tbl_reply');

/*
    create reply
    update reply
    destroy reply
    select reply
    select list reply
*/
/*
exports.insert_reply = function(reply_info, callback) {
    models.tbl_reply.findOrCreate({
        where: {},
        defaults: {
            rwriter: 'fain9301', //tesitng value
            tblBoardId: reply_info.bno,
            rcontent: reply_info.rcontent
        }
    }).spread((row, created) => {
        if (created) {
            console.log('testing created : ', created);
            console.log('reply testing insert : ', created);
            callback(null, null, created);
        } else {
            console.log('reply testing insert row : ', row);
            callback(null, row.dataValues, null);
        }
    }).catch(err => {
        console.log('insert reply error : ', err);
        callback(err, null, null);
    })
}
*/

//create reply
exports.create_reply = function(reply_info, callback) {
    models.tbl_reply.create({
        rwriter: reply_info.rwriter, //tesitng value
        tblBoardId: reply_info.bno,
        rcontent: reply_info.rcontent
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
            tblBoardId: reply_info.bno
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
};

//reply delete
exports.delete_reply = function(reply_info, callback) {
    models.tbl_reply.destroy({
        where: {
            tblBoardId: reply_info.bno,
            id: reply_info.id,
            rwriter: reply_info.rwriter
        }
    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};

//reply only delete matching user
exports.delete_user_reply = function(reply_info, callback) {

};