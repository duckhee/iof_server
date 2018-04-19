var models = require('../../models/index');
var iof_value = require('../../models/iof_value');

//insert iof value
exports.CheckingInsert = function(data_info, callback) {
    models.iof_value.findOne({
        where: {
            id_serial: data_info.serial
        }
    }).then((row) => {

    }).catch((err) => {
        console.log('checking found iof data error : ', err);
        callback(err, null);
    });
};

//checking and insert
exports.CreateValue = function(data_info, callback) {
    models.iof_value.findOrCreate({
        where: {

        },
        defaults: {

        }
    }).spread((result, created) => {
        if (created) {
            callback(null, null, created);
        } else {
            console.log('find or create result iof data  : ', result.dataValues);
            callback(null, result.dataValues, null);
        }
    }).catch((err) => {
        callback(err, null, null);
    });
}

//array insert vlaue
exports.BulkInsert = function(data_info, callback) {
    models.iof_value.bulkCreate(data_info).then((result) => {
        console.log('bulk insert iof data  : ', result);
        callback(null, result);
    }).catch((err) => {
        console.log('bulk insert iof data error : ', err);
        callback(err, null);
    })
}

//insert data
exports.InsertValue = function(data_info, callback) {
    models.iof_value.create({
        id_serial: data_info.serial,
        id_apikey: data_info.apikey,
        deviceId: data_info.device_id,
        id_address: data_info.sd_address,
        id_value: data_info.value,
        id_data: data_info.value,
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('insert iof data error : ')
    });
};

//get 10 value by deviceId
exports.ListLimit10 = function(data_info, callback) {
    models.iof_value.findAll({
        where: {
            deviceId: data_info.id
        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10,
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('limit 10 iof data error : ', err);
        callback(err, null);
    });
};

//get 10 value by serial
exports.SerialLimit10 = function(data_info, callback) {
    models.iof_value.findAll({
        where: {
            id_serial: data_info.serial
        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('limit 10 iof data by serial error : ', err);
        callback(err, null);
    });
};

//delete data
exports.DeleteData = function(data_info, calblack) {
    models.iof_value.destroy({
        where: {
            id_serial: data_info.serial
        }
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        console.log('delete iof data error : ', err);
        callback(err, null);
    });
};

//delete data of reduplication
exports.delete_reduplication_data = function(callback) {
    models.sequelize.query('DELETE FROM device_values WHERE id not in ( SELECT id from iof_values GROUP BY id_serial, createdAt ) as b)').spread((results, metadata) => {
        //result will be an empty array and metadata will conain the number of affected rows.
        console.log('reduplication iof data  ::::::::::::::::::: ', results);
        callback(null, results);
    }).catch((err) => {
        console.log('delete reduplication iof data  error :::::::::::: ', err);
        callback(err, null);
    });
};