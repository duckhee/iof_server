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
        sd_serial: data_info.serial,
        sd_apikey: data_info.apikey,
        deviceId: data_info.device_id,
        sd_address: data_info.sd_address,
        sd_text: data_info.value,
        sd_data: data_info.value,
    }).then(function(row) {
        //console.log('success insert data success ::::: ', row);
        callback(null, row);
    }).catch(function(err) {
        // console.log('erorr insert value :::::: ', err);
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
            deviceId: data_info.id
        },
        order: [
            //['createdAt', 'DESC'] 오름차순 정렬
            ['createdAt', 'ASC'] //내림차순 정렬
        ],
        limit: 10,
    }).then(function(rows) {
        console.log(rows);
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
};

//testing serial limit list
exports.serial10_list = function(data_info, callback) {
    models.device_value.findAll({
        where: {
            device_serial: data_info.serial
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((result) => {
        callback(null, result);
    }).catch((err) => {
        callback(err, null);
    })
}

//find value list not limit
exports.list_value = function(data_info, callback) {
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

//read data value 
exports.read_devicevalue = function(data_info, callback) {
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

//delete data of reduplication
exports.delete_reduplication_data = function(callback){
    models.sequelize.query('DELETE FROM iof_values WHERE id not in ( SELECT id from iof_values GROUP BY id_serial, createdAt ) as b)').spread((results, metadata)=>{
        //result will be an empty array and metadata will conain the number of affected rows.
        console.log('reduplication data ::::::::::::::::::: ',results);
        callback(null,results);
    }).catch((err)=>{
        console.log('delete reduplication data error :::::::::::: ', err);
        callback(err, null);
    });
};

//insert array data callback(err, result) 
exports.insert_array_data = function(data_info, callback){
    models.device_value.bulkCreate(data_info).then((result)=>{
        console.log('insert array data :::::::::::::: ',result);
        callback(null, result);
    }).catch((err)=>{
        console.log('insert array data error ::::::::::::::::: ', err);
        callback(err, null);
    });
}