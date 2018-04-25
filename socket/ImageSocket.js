var dl = require('delivery');
var moment = require('moment');

//controller
var deviceController = require('../server/controllers/device/device_controller');
var cameraController = require('../server/controllers/device/image_controller');

module.exports = function(socket) {
    var delivery = dl.listen(socket);

    //delivery receive image
    delivery.on('receive.success', function(file) {
        console.log('delivery on');
        //checking folder
        var params = file.params;
        var data_folder = moment().format('YYYYMMDD');
        if (!fs.existsSync(process.cwd() + '/camera_images')) {
            fs.mkdirSync(process.cwd() + '/camera_images', '0777');
        }
        var deviceInfo = { serial: params.serial };
        var deviceSerial = deviceController.insert_before(deviceInfo, function(err, result) {
            if (err) {
                console.log('device checking error delivery ::::::: ', err);
            } else if (result) {
                if (!fs.existsSync(process.cwd() + '/camera_images/' + params.serial)) {
                    fs.mkdirSync(process.cwd() + '/camera_images/' + params.serial);
                }
                if (!fs.existsSync(process.cwd() + '/camera_images/' + params.serial + '/' + data_folder)) {
                    fs.mkdirSync(process.cwd() + '/camera_images/' + params.serial + '/' + data_folder);
                }

                /////////////////////////////////////////////////////////////////////////////////////
                //day folder check
                /*
                fs.exists(process.cwd() + '/camera_images/' + params.serial + '/' + data_folder, function(exists) {
                    if (!exists) {
                        fs.mkdir(process.cwd() + '/camera_images/' + params.serial, '0777', function(err) {
                            if (err) {
                                console.log('mkdir folder error ::: ', err);
                                throw err;
                            }
                            console.log('dir channel writed');
                        });
                    }
                });
                //day folder check
                fs.mkdir(process.cwd() + '/camera_images/' + params.serial + '/' + data_folder, '0777', function(err) {
                    if (err) {
                        console.log('mkdir folder error day folder :::::::', err);
                        throw err;
                    }
                });
                */
                /////////////////////////////////////////////////////////////////////////////////////
                fs.writeFile(process.cwd() + '/camera_images/' + params.serial + '/' + data_folder + '/' + params.filename, file.buffer, function(err) {
                    if (err) {
                        console.log('file could not be saved :::: ', err);
                    } else {
                        var filenameArr = params.filename.split('.');
                        console.log('image time :::::: ', filenameArr[0]);
                        var cameraInfo = {
                            "si_serial": params.serial,
                            "si_path": data_folder,
                            "si_filename": params.filename,
                            "si_filesize": params.filesize,
                            "createdAt": filenameArr[0],
                            "updatedAt": filenameArr[0],
                            "id": result.id
                        };
                        console.log("checking camera info :::::: ", cameraInfo);
                        cameraController.insert_image(cameraInfo, function(err, result) {
                            if (err) {
                                console.log('inset image data error :::: ', err);
                            } else if (result) {
                                console.log('insert result log', result);
                            } else {
                                console.log('insert nothing');
                            }
                        });
                        console.log('file : ' + params.filename + ' saved');
                    }
                })
            } else {
                console.log('not device null');
            }
        });
        //insert before checking device end
    });
    //delivery end
}