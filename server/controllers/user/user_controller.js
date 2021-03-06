var models = require('../../models/index');
var user = require('../../models/user');

//make user
exports.create = function(user_info, callback) {
    models.user.findOrCreate({
        where: {
            user_id: user_info.id,
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

//update user
exports.update_user = function(user_info, callback) {
    models.user.update({}, {
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//find user id
exports.find_userid = function(user_info, callback) {
    models.user.find({
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//find user pw
exports.find_userpw = function(user_info, callback) {
    models.user.findOne({
        where: {
            user_id: user_info.user_id,
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    })
}

//find user
exports.find_user = function(user_info, callback) {
    models.user.find({
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    })
}

//list user
exports.list_user = function(user_info, callback) {
    models.user.findAll({
        where: {

        }
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
}

//destory user
exports.delete_user = function(user_info, callback) {
    models.user.destroy({
        where: {
            user_id: user_info.user_id
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
}