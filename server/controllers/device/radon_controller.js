var models = require('../../models/index');
var radon_value = require('../../models/radon_value');

//insert data
exports.InsertData = function(data_info, callback) {
    models.radon_value.create({

    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('insert radon data error :::: ', err);
        callback(err, null);
    });
};

//list device serial
exports.List10Serial = function(data_info, callback) {
    models.radon_value.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('list serial 10 value error ::::: ', err);
    });
};


//device id
exports.List10Data = function(data_info, callback) {
    models.radon_value.findAll({
        where: {
            deviceId: data_info.id
        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('list 10 data error :::: ', err);
        callback(err, null);
    });
};

//insert array
exports.BulkInsert = function(data_array, callback) {
    models.radon_value.bulkCreate(data_array).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('bulk create radon data error ::: ', err);
        callback(err, null);
    });
};

//delete data
exports.deleteData = function(data_info, callback) {
    models.radon_value.destroy({
        where: {

        }
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        callback(err, null);
    });
};