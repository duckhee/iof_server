var models = require('../../models/index');
var device_value = require('../../models/device_value');
var device = require('../../models/device');


//checking device and insert
exports.checking_insert = function(data_info, callback) {
    models.device.findOne({
        where: {

        }
    }).then((row) => {
        models.device_value.create({

        }).then((row) => {

        }).catch((err) => {

        });
    }).catch((err) => {

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

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//read data value 
exports.read_post = function(data_info, callback) {
    models.device.findAll({
        where: {
            id: data_info.bno
        }
    }).then((result) => {
        //console.log('testing result  : ', result);
        var loopIndex = 0;
        for (let device of result) {
            models.device.find({
                include: {
                    model: models.device_value,
                    where: {
                        deviceId: device.id
                    }
                }
            }).then((result2) => {
                console.log('testing result2 :::::', result2);
                if (result2) {
                    console.log('testing result2 : ', result2.device_values);
                    tbl_board.device_values = result2.device_values;
                }
                loopIndex++;
                if (loopIndex === result.length) {
                    console.log('testing result : ', result);
                    callback(null, result);
                }
            }).catch((err) => {
                console.log('result2 error : ', err);
                callback(err, null);
            });
        }
    }).catch((err) => {
        console.log('result error : ', err);
        callback(err, null);
    });
}