var express = require('express');
var router = express.Router();
//controller set 
var imagecontroller = require('../controllers/camera_controller');
var datacontroller = require('../controllers/data_controller');
var settingcontroller = require('../controllers/setting_controller');
//util set
var downloader = require('../util/file');
//get file module
var fs = require('fs');

//get picture ajax
router.get('/ajax_get_images', function(req, res, next) {
    //시리얼 정보 파라미터로 가져오기
    var serial_info = req.query.serial_Num || req.params.serial_Num;
    //실패할시에 가져올 이미지 경로
    var failed_path = {
        "si_serial": "failed",
        "si_path": "failed",
        "si_filename": "failed.jpg",
        "createdAt": ""
    };
    //serial 정보로 넘어온 게 있을 경우
    if (serial_info) {
        var camera_info = {
            "si_serial": serial_info
        };

        //get path in db
        imagecontroller.find_camera(camera_info, function(row, err) {
            if (row) {
                //get file path 
                //경로에 있는 폴더와 이미지파일이 존재하는지 확인 
                try {
                    var get_imgpath = fs.existsSync(process.cwd() + '/camera_images/' + serial_info + '/' + row.si_path + '/' + row.si_filename);
                } catch (err) {
                    console.log('ajax image error : ', err.stack);
                    res.json(failed_path);
                }
                if (!get_imgpath) {
                    res.json(failed_path);
                } else {
                    res.json(row);
                }

            } else if (err) {
                console.log('ajax get images error : ', err.stack);
                //default images
                res.json(failed_path);
            } else {
                //default images
                res.json(failed_path);
            }
        });
    } else {
        //데이터가 없을시
        console.log('not query parameter !');
        res.json(failed_path);
    }
});

//get data ajax limit 3
router.get('/ajax_get_stick_data', function(req, res, next) {
    var serial_info = req.query.serial_Num || req.params.serial_Num;
    data_info = { "sd_serial": serial_info };
    if (serial_info) {
        var data = datacontroller.list_3_limit(data_info, function(rows, err) {
            if (rows) {
                res.json(rows);
            } else if (err) {
                console.log('ajax get limit 3 data error : ', err.stack);
                res.json(0);
            } else {
                console.log('could not get ajax data limit 3');
                res.json(0);
            }
        });
    } else {
        console.log('not serial');
        res.json(0);
    }
});

//get data ajax limit 10
router.get('/ajax_get_data', function(req, res, next) {
    var serial_info = req.query.serial_Num || req.params.serial_Num;
    data_info = { "sd_serial": serial_info };
    if (serial_info) {
        var data = datacontroller.list_limit(data_info, function(rows, err) {
            if (rows) {
                res.json(rows);
            } else if (err) {
                console.log('ajax get data error : ', err.stack);
                res.json(0);
                //res.render('./error/500');
            } else {
                console.log('could not get ajax data');
                res.json(0);
                //res.render('./error/404');
            }
        });
    } else {
        res.json(0);
        //res.render('./error/404');
    }
});

//insert datat http query or parameter json parser //serial 번호 하나와 나머지다 ~
router.post('/insert_data', function(req, res, next) {
    var rowdata_info = '';
    //get json data
    req.on('data', function(data) {
        var data_info = JSON.parse(data);;
        datacontroller.insert_data(data_info, function(row, err) {
            if (row) {
                res.json(row);
            } else if (err) {
                console.log('ajax data insert error : ', err.stack);
                res.json('error');
            } else {
                console.log('null');
                res.json('failed... retry');
            }
        });
    });

    res.redirect('/');
});

//zipping router path: download + / + si_serial + / + si_path + download_image date.zip
router.post('/process/download_zip', function(req, res, next) {
    var serial = req.query.serial_Num || req.params.serial_Num;
    var camera_info = {
        "si_serial": serial,
    };
    console.log('process/download_zip router');
    downloader.zipping_folder(camera_info, function(name, err) {
        if (err) {
            console.log('zipping error : ', err.stack);
            res.redirect('/');
        } else if (name) {
            try {
                var exist_zip = fs.existsSync(process.cwd() + '/download/' + name);

            } catch (err) {
                console.log('error : ', err.stack);
                res.redirect('/');
            }
            if (!exist_zip) {
                console.log(exist_zip);
                res.redirect('/');
            } else {
                res.download(process.cwd() + '/download/' + name);
            }
        } else {
            res.redirect('/');
        }
    });
});

//download csv
router.post('/process/download_csv', function(req, res, next) {
    var serial_Num = req.query.serial_Num || req.param.serial_Num || req.params.serial_Num;
    //파라미터를 넘겨주기 위한 객체 생성
    var csv_info = { "sd_serial": serial_Num, "response": res };
    settingcontroller.group_device(function(group_row, err) {
        var devices = group_row;
        if (devices) {
            downloader.file_csv(csv_info, function(row, err) {
                if (row) {
                    console.log('success : ', row);
                } else if (err) {
                    console.log('down load csv file error : ', err.stack);
                    res.render('./error/500', {
                        devices: devices
                    });
                } else {
                    console.log('null');
                    res.render('./error/404', {
                        devices: devices
                    });
                }
            });
        }
    })

});

//index router 
router.get('/', function(req, res, next) {
    //get serial num ???
    var serial = req.query.serial_Num || req.params.serial_Num;
    //camera 정보를 가져오기 위해서 serial 정보 JSON으로 담아주기
    if (!serial) {
        serial = '01171030125745';
    }
    var camera_info = {
        'si_serial': serial
    };
    var devices;
    var path = '/images/failed/failed/failed.jpg'
    settingcontroller.group_device(function(group_row, err) {
        if (group_row) {
            devices = JSON.stringify(group_row);
            imagecontroller.find_camera(camera_info, function(rows, err) {
                if (rows) {
                    try {
                        var get_filepath = fs.existsSync(process.cwd() + '/camera_images/' + rows.si_serial + '/' + rows.si_path + '/' + rows.si_filename);
                    } catch (err) {
                        console.log('error : ', err.stack);
                        res.render('./pages/test_index', {
                            serial_Num: serial,
                            img_path: path,
                            devices: devices,
                            createdAt: ''
                        });
                        //res.redirect('/');
                    }
                    if (get_filepath) {
                        path = '/images' + rows.si_serial + '/' + rows.si_path + '/' + rows.si_filename;
                    }


                    res.render('./pages/test_index', {
                        serial_Num: serial,
                        img_path: path,
                        devices: devices,
                        createdAt: rows.createdAt
                    });
                } else if (err) {
                    console.log('render error : ', err.stack);
                    res.redirect('/');
                } else {
                    console.log('null');
                    res.render('./pages/test_index', {
                        serial_Num: serial,
                        img_path: path,
                        devices: devices,
                        createdAt: ''
                    });
                }
            });
        }
    });
    //res.render('./pages/index');
});


module.exports = router;