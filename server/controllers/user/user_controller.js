var models = require('../../models/index');
var user = require('../../models/user');

//make user
exports.create_user = function(user_info, callback) {
    models.user.findOrCreate({
        where: {
            user_id: user_info.user_id,
        },
        defaults: {
            user_id: user_info.user_id,
            user_password: user_info.user_pw,
            user_name: user_info.user_name,
            user_email: user_info.user_email,
            user_phone1: user_info.user_phone1,
            user_phone2: user_info.user_phone2,
            user_phone3: user_info.user_phone3,
            user_address1: user_info.user_address1,
            user_address2: user_info.user_address2,
            user_zipcode: user_info.user_zipcode,
            apikey: user_info.user_apikey,
        }
    }).spread((user, created) => {
        if (created) {
            console.log('test created : ', created);
            callback(null, null, created);
        } else {
            console.log(user);
            callback(null, user.dataValues, null);
        }
    }).catch((err) => {
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

//check email
exports.check_email = function(user_info, callback) {
    module.user.find({
        where: {
            user_email: user_info.user_eamil
        }
    }).then((row) => {
        callback(null, row);
    }).catch(err => {
        callback(err, null);
    })
}

//update user
exports.update_user = function(user_info, callback) {
    models.user.update({}, {
        where: {
            user_id: user_info.user_id,
            user_password: user_info.user_pw
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
            user_name: user_info.user_name,
            user_email: user_info.user_email
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
            user_email: user_info.user_email
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//find user
exports.find_user = function(user_info, callback) {
    models.user.find({
        where: {
            user_id: user_info.user_id,
            user_password: user_info.user_password
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//detail user
exports.detail_user = function(user_info, callback) {
    models.user.findOne({
        where: {
            user_id: user_info.user_id,
            user_password: user_info.user_password
        },
        include: [{
            model: models.device,
            attributes: 'device_num, device_name'
        }]
    }).then((row) => {
        console.log(row);
        callback(null, row);
    }).catch(err => {
        console.log('detail user error : ', err);
        callback(err, null);
    })
};

//list user
exports.list_user = function(user_info, callback) {
    models.user.findAll({
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
}

//destory user
exports.delete_user = function(user_info, callback) {
    models.user.destroy({
        where: {
            user_id: user_info.user_id,
            user_password: user_info.user_password
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//user login controller
exports.login = function(user_info, callback) {
    models.user.findOne({
        where: {
            user_email: user_info.user_email,
            user_password: user_info.user_pw
        }
    }).then(row => {
        console.log('login row testing : ', row);
        callback(null, row);
    }).catch(err => {
        console.log('login error : ', err);
        callback(err, null);
    });
};