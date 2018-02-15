var models = require('../../models/index');
var camera_image = require('../../models/camera_image');



//inset carmera
exports.insert_image = function(camera_info, callback) {
    models.camera_image.create({

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
    }).spread(function(image, created) {
        if(created){
            callback(null, null, created);
        }else if(image){
            callback(null, image.dataValues, null);
        }else {
            callback(null, null, null);
        }
    }).catch(function(err) {
        callback(err, null, null);
    });
};

//find carmera
exports.find_image = function(camera_info, callback){
    models.camera_image.find({
        where:{

        }
    }).then(function(row){
        callback(null, row);
    }).catch(function(err){
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
exports.delete_image = function(camera_info, callback){
    models.camera_image.destroy({
        where:{

        }
    }).then(function(row){
        callback(null, row);
    }).catch(function(err){
        callback(err, null);
    })
}