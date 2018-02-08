var models = require('../../models/index');
var user = require('../../models/user');


exports.create = function(user_info, callback) {
    models.user.findOrCreate({
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

//check id
exports.check_id = function(user_info, callback) {
    models.user.findAndCount({
        where: {
            user_id: user_info.user_id
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};