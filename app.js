var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var flash = require('connect-flash');

var index = require('./server/routes/index');
var user = require('./server/routes/users/user');
var device = require('./server/routes/device/device');
var boarder = require('./server/routes/boarder/boarder');
var data = require('./server/routes/device/data/data');

//controller add 
var dataController = require('./server/controllers/device/data_controller');
var settingController = require('./server/controllers/device/device_setting_controller');
var deviceContrller = require('./server/controllers/device/device_controller');
var cameraControllers = require('./server/controllers/device/image_controller');
var network_controller = require('./server/controllers/device/network_controller');
//passport testing
//var custom_passport = require('./server/config/passport');

//test router 테스트용 라우터 모든 테스트 여기
var test = require('./server/routes/testrouter');

let db = require('./server/models');



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
        })

    });


    //socket disconnect
    socket.on('disconnect', function() {
        console.log('user disconnected socket end device :::::: ');
    });
    //insert device info
    socket.on('device_setting_request', function(data) {
        console.log('device setting request ::::::::: ', data);
        //first time device registe
        if (data.msg === 0) {
            //device setting
            //devive settting found
            console.log('testing msg == 0');
            io.emit('device_setting_receive_6iOAk0yqx3eRspZXuSsV', "msg 0 testing");

        }
        if (data.msg === 1) {
            //update device setting
            console.log('testing msg == 1');
            io.emit('device_setting_receive_6iOAk0yqx3eRspZXuSsV', "msg 1 testing");
        }
    });
    //save sensor info
    socket.on('sensor_data_request', function(data) {
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
                dataController.insert_value(insertValue, function(err, result) {
                    if (result) {
                        io.emit('sensor_data_receive_' + data.serial, { msg: 1 });
                        network_controller.update_actstatus(data.info, function(err, result) {
                            if (err) {
                                console.log('updateing active network error ::::: ', err);
                            } else {
                                console.log('success updating network set ::::: ', result);
                            }
                        });
                    } else if (err) {
                        console.log('socket data insert error :::::: ', err);
                    } else {
                        console.log('null insert device');
                    }
                });
            } else {
                console.log('not device ');
            }
        });
    });

    socket.on('sensor_array_data_request', function(data) {
        console.log('socket arr :::::::: ', data);
        deviceContrller.insert_before(data, function(err, result) {
            if (err) {
                console.log('insert before checking device error ::::::', err);
            } else if (result) {
                dataController.insert_array_data(data, function(err, result) {
                    if (result) {
                        io.emit('sensor_data_receive_' + data[0].sd_serial, { msg: 1 });
                        dataController.delete_reduplication_data(function(err) {
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


var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/server/views/pages'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secretkeywon',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
    }
}));

//passport add
//app.use(passport.initialize()); // passport 구동
//app.use(passport.session()); // 세션 연결
//get public folder url (css, javascript, bootstrap)
app.use('/static', express.static(path.join(__dirname, 'public')));
//get camera image url
app.use('/images', express.static(path.join(__dirname, 'camera_images')));
//get upload file url
app.use('/upload', express.static(path.join(__dirname, 'upload')));
//zip file download
app.use('/download', express.static(path.join(__dirname, 'download')));

//index router
app.use('/', index);
//user router
app.use('/user', user);
//device router
app.use('/device', device);
//boarder router
app.use('/boards', boarder);
//get data or insert data router
app.use('/data', data);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('../error/404');
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log('server error : ', err);
    // render the error page
    res.status(err.status || 500);
    res.render('../error/500');
});

//data base connectin check
db.sequelize.sync().then(() => {
    console.log("db connection success");
}).catch((err) => {
    console.log('db connection error');
    console.log(err);
    console.log(err.stack);
});




module.exports = app;