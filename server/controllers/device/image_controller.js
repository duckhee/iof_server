var models = require('../../models/index');
var camera_image = require('../../models/camera_image');



//inset carmera
exports.insert_image = function(camera_info, callback) {
    models.camera_image.create({
        deviceId: camera_info.id,
        si_serial: camera_info.si_serial,
        si_path: camera_info.si_path,
        si_filename: camera_info.si_filename,
        si_filesize: camera_info.si_filesize
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(err, null);
    });
};

//insert data callback(row, err); array insert
exports.insert_array_image = function(camera_info, callback) {
    models.camera_image.bulkCreate(camera_info).then(function(result) {
        callback(null, result);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(err, null);
    });
};

//find or create carmera
exports.findinsert_image = function(camera_info, callback) {
    models.camera_image.findOrCreate({
        where: {

        },
        defaults: {

        }
    }).spread((result, created) => {
        if (created) {
            console.log('testing created :::::', created);
            callback(null, null, created);
        } else {
            console.log(result);
            callback(null, result.dataValues, null);
        }
    }).catch((err) => {
        callback(err, null, null);
    });
}

//find carmera
exports.find_image = function(camera_info, callback) {
    models.camera_image.find({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((row) => {
        callback(null, row);
    }).catch((err) => {
        callback(err, null);
    });
};


//view web limit show data callback(rows, err);
exports.list_limit_image = function(camera_info, callback) {
    models.camera_image.findAll({
        where: {
            sd_serial: camera_info.sd_serial //'01171030130408'
        },
        limit: 12,
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(err, null);
    });
};

//delete carmera image
exports.delete_image = function(camera_info, callback) {
    models.camera_image.destroy({
        where: {

        }
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    })
};