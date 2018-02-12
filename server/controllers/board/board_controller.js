var models = require('../../models/index');
var tbl_board = require('../../models/tbl_board');


//board insert create
exports.create = function(data_info, callback){
    models.tbl_board.create({

    }).then(function(row){
        callback(null, row);
    }).catch(function(err){
        callback(err, null);
    });
};

//board insert
exports.insert = function(data_info, callback) {
    models.tbl_board.findOrCreate({
        where: {

        },
        default: {

        }
    }).spread(function(user, created) {
        if (created) {
            callback(null, null, created);
        } else {
            callback(null, user.dataValues, null);
        }
    }).catch(function(err) {
        callback(err, null, null);
    });
};

//create read tbl board detail
exports.read = function(data_info, callback) {
    models.tbl_board.findOne({
        where: {
            id: data_info.index
        },
        /*
        include: [{
            model: models.user,
            attributes: ['user_id]
        }]
        */
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//board start list
exports.start_list = function(callback){
    models.tbl_board.findAll({
        order:[
            ['createdAt', 'DESC']
        ]
    }).then(function(rows){
        console.log('rows : ', rows);
        callback(null, rows);
    }).catch(function(err){
        console.log('error : ', err);
        callback(err, null);
    })
}

//board list 
exports.list = function(data_info, callback){
    models.tbl_board.findAll({
        where:{

        },
        order:[
            ['createdAt', 'DESC']
        ]
    }).then(function(rows){
        callback(null, rows);
    }).catch(function(err){
        callback(err, null);
    });
};

//update count
exports.upcount = function(data_info, callback) {
    models.tbl_board.update({}, {
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};