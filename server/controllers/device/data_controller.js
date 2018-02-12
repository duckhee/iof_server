var models = require('../../models/index');
var device_value = require('../../models/device_value');

//insert value
exports.insert_value = function(data_info, callback){
    models.device_value.create({

    }).then(function(row){
        callback(null, row);
    }).catch(function(err){
        callback(err, null);
    })
}

//check create vaue
exports.create_value = function(data_info, callback){
    models.device_value.findOrCreate({
        where:{

        },
        defaults:
        {

        }
    }).spread(function(value, created){
        if(created){
            callback(null, null, created);
        }else{
            callback(null, value.dataValues, null);
        }
    }).catch(function(err){
        callback(err, null, null);
    });
};

//array insert vlaue
exports.bulk_create = function(data_info, callback){
    models.device_value.bulkCreate(data_info).then(function(result){
        callback(null, result);
    }).catch(function(err){
        callback(err, null);
    });
};

//find value list limit 10
exports.list10_value = function(data_info, callback){
    models.device_value.findAll({
        where:{

        },
        order:[
            ['createdAt', 'DESC']
        ]
    }).then(function(rows){
        callback(null, rows);
    }).catch(function(err){
        callback(err, null);
    });
};

//find value list not limit
exports.list_value = function(data_info, callback){
    models.device_value.findAll({
        where:{

        }
    }).then(function(rows){
        callback(null, rows);
    }).catch(function(err){
        callback(err, null);
    });
};


//delete value 
exports.delete_value = function(data_info, callback){
    models.device_value.destroy({
        where:{

        }
    }).then(function(row){
        callback(null, row);
    }).catch(function(err){
        callback(err, null);
    });
};