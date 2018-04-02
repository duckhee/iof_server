var models = require('../../models/index');
var device_network = require('../../models/device_network');


//testing network check
exports.check_network = function(network_info, callback){
    models.device_network.findAll({

    }).then((result)=>{
        console.log('testing result  ::::::::::::: ', result);
        var loopIndex = 0;
        for(let device_network of result){
            models.device_network.find({
                include:{
                    model:models.device,
                    where:{
                        id:device_network.devcieId
                    }
                }
            }).then((result2)=>{
                console.log('testing result2 :::::::::::', result2);
                if(reuslt2){
                    device_network.devices = result2.devices;
                }
                loopIndex++;
                if(loopIndex === result.length){
                    console.log('testing result ::::::::::', result);
                    callback(null, result);
                }
            }).catch((err)=>{
                console.log('result2 error ::::::::::', err);
                callback(err, null);
            });
        }
    }).catch((err)=>{
        console.log('result error ::::::::::', err);
        callback(err, null);
    });
};