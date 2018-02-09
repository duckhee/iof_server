var models = require('../../../models/index');
var tbl_board = require('../../../models/tbl_board');

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
            attributes: []
        }]
        */
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
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
    })
}