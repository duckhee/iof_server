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
                    var filename_arr = params.img_name.split(".");
                    console.log('image time :::::: ', filename_arr[0]);
                    var camera_info = {
                        "si_serial": params.serial,
                        "si_path": date_folder,
                        "si_filename": params.filename,
                        "si_filesize": params.filesize,
                        "createdAt": filename_arr[0],
                        "updatedAt": filename_arr[0]
                    };
                    console.log(camera_info);
                    cameraControllers.insert_image(camera_info, function(err, row) {
                        if (err) {
                            //console.log(err);
                        } else if (row) {
                            console.log(row.stack);
                        } else {
                            console.log('error');
                        }
                    });
                    console.log('File ' + params.filename + " saved");
                }
            });
        });
        //socket disconnect
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
        //insert device info
        socket.on('device_setting_request', function(dat) {
            console.log(data);
            //first time device registe
            if (data.msg === 0) {
                //device setting
                //devive settting found

            }
            if (data.msg === 1) {
                //update device setting
            }
        });
        //save sensor info
        socket.io('sensor_data_request', function(data) {
            console.log('socket ::::: ' + data);
            deviceContrller.insert_before(data, function(err, result) {
                if (err) {
                    console.log('insert before checking device error ::::::', err);
                } else if (result) {
                    console.log('device checking success !');
                    dataController.insert_value(data, function(err, result) {
                        if (result) {
                            io.emit('sensor_data_receive_' + data.sd_serial, { msg: 1 });
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

        socket.io('sensor_array_data_request', function(data) {
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