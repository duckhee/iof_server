

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//카메라 사진 저장
var io = require('socket.io').listen(5001), // 이미지 저장관련 소켓
    dl = require('delivery'), //이미지 전달 모듈
    fs = require('fs'); // 파일 저장
var moment = require('moment'); //시간 모듈

io.sockets.on('connection', function(socket) {

    var delivery = dl.listen(socket);

    delivery.on('receive.success', function(file) {
        console.log("delivery on");
        //채널별 폴더유무 체크
        var params = file.params;
        var date_folder = moment().format('YYYYMMDD');
        if (!fs.existsSync(process.cwd() + '/camera_images')) {
            fs.mkdirSync(process.cwd() + '/camera_images', '0777');
        }
        var deviceinfo = { serial: params.serial };
        var device_serial = deviceContrller.insert_before(deviceinfo, function(err, result) {
            if (err) {
                console.log('device checking error ::::::::: ', err);
            } else if (result) {
                if (!fs.existsSync(process.cwd() + '/camera_images/' + params.serial)) {
                    fs.mkdirSync(process.cwd() + '/camera_images/' + params.serial);
                }
                if (!fs.existsSync(process.cwd() + '/camera_images/' + params.serial + '/' + date_folder)) {
                    fs.mkdirSync(process.cwd() + '/camera_images/' + params.serial + '/' + date_folder);
                }
                //일별 폴더 유무 체크
                fs.exists(process.cwd() + '/camera_images/' + params.serial + "/" + date_folder, function(exists) {
                    console.log(exists);
                    if (!exists) {
                        //채널 폴더 유무 체크
                        fs.exists(process.cwd() + '/camera_images/' + params.serial, function(exists) {
                            if (!exists) {
                                fs.mkdir(process.cwd() + '/camera_images/' + params.serial, '0777', function(err) {
                                    if (err) throw err;
                                    console.log('dir channel writed');
                                });
                            }
                        });

                        //일별 폴더 유무 체크
                        fs.mkdir(process.cwd() + '/camera_images/' + params.serial + "/" + date_folder, '0777', function(err) {
                            if (err) throw err;
                            console.log('dir date writed');
                        });
                    }
                    //이미지일 경우만 저장
                    fs.writeFile(process.cwd() + "/camera_images/" + params.serial + "/" + date_folder + "/" + params.filename, file.buffer, function(err) {
                        if (err) {
                            console.log('File could not be saved: ' + err);
                        } else {
                            var filename_arr = params.filename.split(".");
                            console.log('image time :::::: ', filename_arr[0]);
                            var camera_info = {
                                "si_serial": params.serial,
                                "si_path": date_folder,
                                "si_filename": params.filename,
                                "si_filesize": params.filesize,
                                "createdAt": filename_arr[0],
                                "updatedAt": filename_arr[0],
                                "id": result.id
                            };
                            console.log(camera_info);
                            cameraControllers.insert_image(camera_info, function(err, row) {
                                if (err) {
                                    console.log('insert image error ::::::::::: ', err);
                                    console.log('insert image error stack ::::::::::: ', err.stack);
                                    console.log('insert image error code ::::::::::: ', err.code);
                                } else if (row) {
                                    console.log('insert image log :::::::::::: ', row);
                                } else {
                                    console.log('error');
                                }
                            });
                            console.log('File ' + params.filename + " saved");
                        }
                    });
                });
            } else {
                console.log('deivce null');
            }
        });
    });
    //socket disconnect
    socket.on('disconnect', function() {
        console.log('user disconnected socket end device :::::: ');
    });
    //insert device info
    socket.on('device_setting_request', function(data) {
        console.log('device setting request ::::::::: ', data);
        var serialInof = { "serial": data.serial }
        deviceContrller.find_device(serialInof, function(err, result) {
            if (err) {
                console.log('not found device');
                var errSetting = {};
                io.emit('device_setting_receive_notdevice', errSetting);
            } else {
                //first time device registe
                if (data.msg === 0) {
                    //device setting
                    //devive settting found
                    console.log('testing msg == 0');
                    io.emit('device_setting_receive_' + result.sd_serial, "msg 0 testing");
                }
                if (data.msg === 1) {
                    //update device setting
                    console.log('testing msg == 1');
                    io.emit('device_setting_receive_' + result.sd_serial, "msg 1 testing");
                }
            }
        });
    });
    //insert iof device setting
    socket.on('iof_device_setting_request', function(data){
        console.log('iof device setting request ::::::::::: ', data);
        var serialInfo = {"serial":data.serial};
        deviceContrller.find_device(serialInfo, function(err, result){
            if(err){
                console.log('device setting error :::: ', err);
                var errorSetting = {};
                io.emit('iof_device_setting_error', errorSetting);
            }else{
                if(data.msg === 0){

                }else if(data.msg === 1){
                    
                }
            }
        })
    });
    //save sensor info
    socket.on('sensor_iofdata_request', function(data) {
        console.log('socket ::::: ' + data);
        deviceContrller.insert_before(data.info, function(err, result) {
            if (err) {
                console.log('insert before checking device error ::::::', err);
            } else if (result) {
                console.log('device checking success !');
                console.log('socket data insert before :::::::: ', result.device_apikey);
                var insertValue = {
                    "serial": data.info.serial,
                    "apikey": result.device_apikey,
                    "device_id": result.id,
                    "sd_address": data.info.sd_address,
                    "value": data.info.value,
                };
                IoFValueController.InsertValue(insertValue, function(err, result) {
                    if (result) {
                        io.emit('sensor_iofdata_receive_' + data.serial, { msg: 1 });
                        network_controller.update_actstatus(data.info, function(err, result) {
                            if (err) {
                                console.log('updateing active network error ::::: ', err);
                            } else {
                                console.log('success updating network set ::::: ', result);
                            }
                        });
                    } else if (err) {
                        console.log('socket iof data insert error :::::: ', err);
                    } else {
                        console.log('null insert device');
                    }
                });
            } else {
                console.log('not device ');
            }
        });
    });

    socket.on('sensor_array_iofdata_request', function(data) {
        console.log('socket arr :::::::: ', data);
        deviceContrller.insert_before(data, function(err, result) {
            if (err) {
                console.log('insert before checking device error ::::::', err);
            } else if (result) {
                IoFValueController.BulkInsert(data, function(err, result) {
                    if (result) {
                        io.emit('sensor_data_receive_' + data[0].sd_serial, { msg: 1 });
                        IoFValueController.delete_reduplication_data(function(err) {
                            if (err) {
                                console.log('app delete reduplication error ::::::::::::: ', err);
                            } else {
                                console.log('null delete data');
                            }
                        });
                    } else if (err) {
                        console.log('insert array data requeset inserto error :::::::::::: ', err);
                    } else {
                        console.log('null data ');
                    }
                });
            } else {
                console.log('null insert device');
            }
        });
    });


});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

