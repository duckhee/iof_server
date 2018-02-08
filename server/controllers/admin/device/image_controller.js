var models = require('../../../models/index');
var camera_image = require('../../../models/camera_image');




exports.insert = function(camera_info, callback) {
    models.camera_image.create({

    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(err, null);
    });
};

//insert data callback(row, err); array insert
exports.insert_array_data = function(camera_info, callback) {
    models.camera_image.bulkCreate(camera_info).then(function(result) {
        callback(null, result);
    }).catch(function(err) {
        console.log('error : ', err.stack);
        callback(err, null);
    });
};

exports.findinsert = function(camera_info, callback) {
    models.camera_image.findOrCreate({
        where: {

        },
        defaults: {

        }
    }).spread(function() {

    }).catch(function(err) {
        callback(err, null);
    });
};


//view web limit show data callback(rows, err);
exports.list_limit = function(camera_info, callback) {
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