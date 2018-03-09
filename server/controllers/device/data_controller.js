var models = require('../../models/index');
var device_value = require('../../models/device_value');
var device = require('../../models/device');


//checking device and insert
exports.checking_insert = function(data_info, callback) {
    models.device.findOne({
        where: {
            device_serial: data_info.serial
        }
    }).then((row) => {
        models.device_value.create({
            sd_text: '',
            sd_data: data_info.data_value,
        }).then((row) => {
            callback(null, row);
        }).catch((err) => {
            callback(err, null);
        });
    }).catch((err) => {
        callback(err, null);
    });
};

//insert value
exports.insert_value = function(data_info, callback) {
    models.device_value.create({

    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    })
}

//check create vaue
exports.create_value = function(data_info, callback) {
    models.device_value.findOrCreate({
        where: {

        },
        defaults: {

        }
    }).spread(function(value, created) {
        if (created) {
            callback(null, null, created);
        } else {
            callback(null, value.dataValues, null);
        }
    }).catch(function(err) {
        callback(err, null, null);
    });
};

//array insert vlaue
exports.bulk_create = function(data_info, callback) {
    models.device_value.bulkCreate(data_info).then(function(result) {
        callback(null, result);
    }).catch(function(err) {
        callback(err, null);
    });
};

//find value list limit 10
exports.list10_value = function(data_info, callback) {
    models.device_value.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10,
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
};

//find value list not limit
exports.list_value = function(data_info, callback) {
    models.device_value.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
};


//delete value 
exports.delete_value = function(data_info, callback) {
    models.device_value.destroy({
        where: {
            sd_serial: data_info.serial
        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};