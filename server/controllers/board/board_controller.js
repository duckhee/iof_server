var models = require('../../models/index');
var tbl_board = require('../../models/tbl_board');


//board insert create
exports.create = function(boarder_info, callback) {
    models.tbl_board.create({
        title: boarder_info.title,
        content: boarder_info.content,
        writer: boarder_info.writer
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//board insert
exports.insert = function(boarder_info, callback) {
    models.tbl_board.findOrCreate({
        where: {

        },
        /*
        include :[{
            model:models.user, 
            attributes:'user_id',
            where:{
                user_id:data_info.user_id
        }}],
        */
        default: {

        }
    }).spread((user, created) => {
        if (created) {
            callback(null, null, created);
        } else {
            callback(null, user.dataValues, null);
        }
    }).catch((err) => {
        callback(err, null, null);
    });
};

//create read tbl board detail
exports.read = function(data_info, callback) {
    models.tbl_board.findOne({
        where: {
            id: data_info.index
        },
        include: [{
            model: models.tbl_reply
        }]
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//board start list
exports.start_list = function(callback) {
    models.tbl_board.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(rows) {
        console.log('rows : ', rows);
        callback(null, rows);
    }).catch(function(err) {
        console.log('error : ', err);
        callback(err, null);
    })
}

//board list 
exports.list = function(data_info, callback) {
    models.tbl_board.findAll({
        where: {

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

//update count
exports.upcount = function(data_info, callback) {
    models.tbl_board.update({}, {
        where: {

        },
        /*
        include :[{
            model:models.user, 
            attributes:'user_id',
            where:{
                user_id:data_info.user_id
        }}],
        */
    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};

//testing update count
exports.upcounting = function(data_info, callback) {
    models.tbl_board.findOne({
        where: {
            id: data_info.index
        },
    }).then((row) => {
        models.tbl_board.increment('viewcnt', { by: 1 }).then(rows => {
            callback(null, rows);
        }).catch(err => {
            callback(err, null);
        });
    }).catch(err => {
        callback(err, null);
    });
};

//boarder modify
exports.modify = function(boarder_info, callback) {
    models.tbl_board.update({
        title: boarder_info.title,
        content: boarder_info.content,
    }, {
        where: {
            id: boarder_info.post_id
        },
        include: [{
            model: models.user,
            attributes: 'user_id',
            where: {
                user_id: boarder_info.user_id
            }
        }]
    }).then(row => {
        console.log('modify boarder : ', row);
        callback(null, row);
    }).catch(err => {
        console.log('modify boarder error : ', err);
        callback(err, null);
    })
}