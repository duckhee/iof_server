/*
    file downlad
    file uplaod
    mysql file downlaod - data search and file make download
    zip image and zip location download
    file find
    folder zip
 */

var util = require('util');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var formidable = require('formidable');
var zip = require('node-zip');
var folder_zip = require('zip-folder');
//time module
var moment = require('moment');
var excel = require('excel4node');
//controller value 
var valueControllers = require('../controllers/data_controller');

//file zip file_info{name} callback
exports.file_zip = function(file_info, callback) {

};

//zipping folder serial 
exports.zipping_folder = function(folder_info, callback) {
    var zip_target = folder_info.si_serial;
    //download name
    var zip_name = moment().format('YYYYMMDD');
    var check_serialfolder;
    //image file state check
    var image_filecheck;
    try {
        image_filecheck = fs.existsSync(process.cwd() + '/camera_images/' + zip_target);
    } catch (err) {
        console.log(err.stack);
        callback(null, err);
    }
    if (!image_filecheck) {
        console.log('not iamges');
        callback(null, null);
    } else if (image_filecheck) {
        try {
            check_serialfolder = fs.existsSync(process.cwd() + '/download/' + zip_target);
        } catch (err) {
            console.log(err.stack);
            callback(null, err);
        }
        if (!check_serialfolder) {
            try {
                fs.mkdirSync(process.cwd() + '/download/' + zip_target, '0777');
            } catch (err) {
                console.log('mkdir : ', err.stack);
                callback(null, err);
            }
        }

        //folder location found and zip
        folder_zip(process.cwd() + '/camera_images/' + zip_target,
            process.cwd() + '/download/' + zip_target + '/' + zip_target + ' download_image ' + zip_name + '.zip',
            function(err) {
                if (err) {
                    console.log('failed make zip file', err.stack);
                    callback(null, err);
                } else {
                    console.log('make zip folder success');
                    var name = zip_target + '/' + zip_target + ' download_image ' + zip_name + '.zip';
                    callback(name, null);
                }
            });

    } else {
        console.log('null');
        callback(null, null);
    }

}

//if serial/si_path want              ::::::::folder zip
exports.folder_zipping = function(folder_info, callback) {
    var folder_name = folder_info.name;
    //download name
    var date = moment().format('YYYYMMDD');
    //check folder exist and make folder(download)
    var first_folder_check;
    var second_folder_check;
    try {
        second_folder_check = fs.existsSync(process.cwd() + '/download/' + folder_info.si_serial + '/' + folder_info.si_path);
    } catch (err) {
        console.log(err.stack);
        callback(err);
    }
    if (!second_folder_check) {
        try {
            first_folder_check = fs.existsSync(process.cwd() + '/download/' + folder_info.si_serial);
        } catch (err) {
            console.log(err.stack);
            callback(err);
        }
        if (!first_folder_check) {
            fs.mkdir(process.cwd() + '/download/' + folder_info.si_serial, '0777', function(err) {
                if (err) {
                    console.log(err.stack);
                    callback(err);
                } else {
                    console.log('make folder success');
                }
            });
        }
        fs.mkdir(process.cwd() + '/download/' + folder_info.si_serial + '/' + folder_info.si_path, '0777', function(err) {
            if (err) {
                console.log(err.stack);
                callback(err);
            } else {
                console.log('make folder success');
            }
        });
    }

    //folder location found and zip
    folder_zip(process.cwd() + '/camera_images/' + folder_info.si_serial + '/' + folder_info.si_path,
        process.cwd() + '/download/' + folder_info.si_serial + '/' + folder_info.si_path + '/' + 'download_image ' + date + '.zip',
        function(err) {
            if (err) {
                console.log('failed make zip file', err.stack);
                callback(err);
            } else {
                console.loog('make zip folder success');
                callback(null);
            }
        });
};

//find file
exports.file_find = function(file_info, callback) {
    var folder_path = file_info.folder;
    var file_name = file_info.name;
    fs.exists(process.cwd() + '/camera_images/' + folder_path + '/' + file_name + '.jpg', function(exists) {
        if (!exists) {
            console.log('not exist');
            callback(null);
        } else {
            console.log('exist');
            var name = process.cwd() + '/camera_images/' + folder_path + '/' + file_name + '.jpg';
            callback();
        }
    });

};


//file downlaod file_info{name} callback
exports.file_download = function(file_info, callback) {

};

//file upload file_info{} callback
// exports.file_upload = function(file_info, callback) {


// };

//file_info에 sd_serial 정보가 들어가야한다.
//make data file .csv callback error file_info에 res를 담아주어야한다.
exports.file_csv = function(file_info, callback) {

    var csvfile = new excel.Workbook();
    //first sheet add file
    var first_sheet = csvfile.addWorksheet('sheet1');
    //sheet style set up
    var sheet_style = csvfile.createStyle({
        alignment: {
            horizontal: ['center'],
            vertical: ['center']
        },
        font: {
            size: 10,
            bold: false,
        },
        border: {
            left: {
                style: 'thin',
                color: '#000000'
            },
            right: {
                style: 'thin',
                color: '#000000'
            },
            top: {
                style: 'thin',
                color: '#000000'
            },
            bottom: {
                style: 'thin',
                color: '#000000'
            }
        }
    });

    /*
        column A : index
        column B : serial 
        column C : address
        column D : date
        column E ~  : value
        serial, address, value, date, index
    */

    //data 모두 가져오기 
    valueControllers.download_data(file_info, function(row, err) {
        if (row) {
            //setting title
            //console.log(row);
            first_sheet.cell(1, 1).string("no").style(sheet_style);
            first_sheet.cell(1, 2).string("serial").style(sheet_style);
            first_sheet.cell(1, 3).string("address").style(sheet_style);
            first_sheet.cell(1, 4).string("date").style(sheet_style);

            var testing = row[1].dataValues.sd_data.split(',');

            //value title setting
            for (var j = 1; j <= testing.length; j++) {
                if (j <= 8) {
                    //처음 명령어가 ec 정보 가져오기
                    for (var number = 1; number <= 8; number++) {
                        first_sheet.cell(1, 4 + number).string("ec " + number).style(sheet_style);
                    }
                } else if (j <= 16) {
                    //두번째 명령어가 온도 정보 가져오기
                    for (var number = 1; number <= 8; number++) {
                        first_sheet.cell(1, 12 + number).string("Temperature " + number).style(sheet_style);
                    }
                } else if (j <= 24) {
                    //세번째 명령어가 수분 정보 가져오기
                    for (var number = 1; number <= 8; number++) {
                        first_sheet.cell(1, 20 + number).string("moisture " + number).style(sheet_style);
                    }
                }
            }
            for (var i in row) {
                //column width setting
                //for문 하나

                //cell에 number type이 들어가야해서 변환 
                var Num_i = parseInt(i);
                for (var c = 1; c <= 8; c++) {
                    if (c === 4) {
                        first_sheet.column(c).setWidth(44);
                    } else {
                        first_sheet.column(c).setWidth(20);
                    }
                }
                //for문 끝
                //row height setting
                //first_sheet.row(ii + 1).setHeight(10);

                ////////////////for 문 제어 필요///////
                //번호 넣어주기
                first_sheet.cell(Num_i + 2, 1).number(Num_i + 1).style(sheet_style);

                //serial 넣어주기
                first_sheet.cell(Num_i + 2, 2).string(row[i].dataValues.sd_serial.toString()).style(sheet_style);

                //address 넣어주기
                first_sheet.cell(Num_i + 2, 3).string(row[i].dataValues.sd_address.toString()).style(sheet_style);

                //date 넣어주기
                first_sheet.cell(Num_i + 2, 4).string(row[i].dataValues.createdAt.toString()).style(sheet_style);
                //data parser
                var array = row[i].dataValues.sd_data.split(',');
                //write data 
                //여기서 부터 for문 하나
                for (var a in array) {
                    //string을 number type으로 변환 
                    var Num_a = parseInt(a);
                    //깨진 데이터 처리 
                    var exper_data = !isNaN(array[a]) ? array[a] : "000.0";
                    //write data
                    first_sheet.cell(Num_i + 2, Num_a + 5).string(exper_data).style(sheet_style);
                }

                //두번째 for문 끝
            }

            ////////////여기 까지 ////////////////
            var date = moment().format('YYYYMMDD');
            console.log('success ! ');

            //make csv file or download file 
            csvfile.write('download_date ' + date + '.csv', file_info.response);
            //만약 서버에 파일을 생성을 하고 싶으면 밑에 주석 풀고 위에 주석 처리
            //csvfile.write('download_date'+date+'.csv);
            callback(row, null);
        } else if (err) {
            console.log('csv file make error : ', err.stack);
            callback(null, err);
        } else {
            callback(null, null);
        }
    });

};

//camera size check function make
exports.get_filesize = function(file_info, callback) {
    //file size get set
    try {
        const stat = fs.statSync(file_info.path);
        const file_size = stat.size;
        callback(file_size, null);
    } catch (err) {
        console.log('error : ', err.stack);
        callback(null, err);
    }
};



//file_info에 sd_serial 정보가 들어가야한다.
//make data file .csv callback error file_info에 res를 담아주어야한다.
/*
exports.data_one_csv = function(file_info, callback) {

        var csvfile = new excel.Workbook();
        //first sheet add file
        var first_sheet = csvfile.addWorksheet('sheet1');
        //sheet style set up
        var sheet_style = csvfile.createStyle({
            alignment: {
                horizontal: ['center'],
                vertical: ['center']
            },
            font: {
                size: 10,
                bold: false,
            },
            border: {
                left: {
                    style: 'thin',
                    color: '#000000'
                },
                right: {
                    style: 'thin',
                    color: '#000000'
                },
                top: {
                    style: 'thin',
                    color: '#000000'
                },
                bottom: {
                    style: 'thin',
                    color: '#000000'
                }
            }
        });

        
        //    column A : index
        //    column B : serial 
        //    column C : address
        //    column D : date
        //    column E ~  : value
        //    serial, address, value, date, index
        
        
            //data 모두 가져오기 
            valueControllers.download_data(file_info, function(row, err) {
                if (row) {
                    //setting title
                    first_sheet.cell(1, 1).string("no").style(sheet_style);
                    first_sheet.cell(1, 2).string("serial").style(sheet_style);
                    first_sheet.cell(1, 3).string("address").style(sheet_style);
                    first_sheet.cell(1, 4).string("date").style(sheet_style);

                    var testing = row[1].dataValues.sd_data.split(',');

                    //value title setting
                    for (var j = 1; j <= testing.length; j++) {
                        if (j <= 8) {
                            //처음 명령어가 ec 정보 가져오기
                            for (var number = 1; number <= 8; number++) {
                                first_sheet.cell(1, 4 + j).string("ec" + number).style(sheet_style);
                            }
                        } else if (j <= 16) {
                            //두번째 명령어가 온도 정보 가져오기
                            for (var number = 1; number <= 8; number++) {
                                first_sheet.cell(1, 4 + j).string("온도" + number).style(sheet_style);
                            }
                        } else if (j <= 24) {
                            //세번째 명령어가 수분 정보 가져오기
                            for (var number = 1; number <= 8; number++) {
                                first_sheet.cell(1, 4 + j).string("수분" + number).style(sheet_style);
                            }
                        }
                    }
                    for (var i in row) {
                        //column width setting
                        //for문 하나
                        //cell에 number type이 들어가야해서 변환 
                        var Num_i = parseInt(i);
                        for (var c = 1; c <= 8; c++) {
                            if (c === 4) {
                                first_sheet.column(c).setWidth(44);
                            } else {
                                first_sheet.column(c).setWidth(20);
                            }
                        }
                        //for문 끝
                        //row height setting
                        //first_sheet.row(ii + 1).setHeight(10);

                        ////////////////for 문 제어 필요///////
                        //번호 넣어주기
                        first_sheet.cell(Num_i + 2, 1).number(Num_i + 1).style(sheet_style);

                        //serial 넣어주기
                        first_sheet.cell(Num_i + 2, 2).string(row[i].dataValues.sd_serial.toString()).style(sheet_style);

                        //address 넣어주기
                        first_sheet.cell(Num_i + 2, 3).string(row[i].dataValues.sd_address.toString()).style(sheet_style);

                        //date 넣어주기
                        first_sheet.cell(Num_i + 2, 4).string(row[i].dataValues.createdAt.toString()).style(sheet_style);
                        //data parser
                        var array = row[i].dataValues.sd_data.split(',');
                        //write data 
                        //여기서 부터 for문 하나
                        for (var a in array) {
                            //string을 number type으로 변환 
                            var Num_a = parseInt(a);
                            //write data
                            first_sheet.cell(Num_i + 2, Num_a + 5).string(array[a].toString()).style(sheet_style);
                        }

                        //두번째 for문 끝
                    }

                    ////////////여기 까지 ////////////////
                    var date = moment().format('YYYYMMDD');
                    console.log('success ! ');
                    //make csv file or download file 
                    csvfile.write('download_date ' + date + '.csv', file_info.response);
                    //만약 서버에 파일을 생성을 하고 싶으면 밑에 주석 풀고 위에 주석 처리
                    //csvfile.write('download_date'+date+'.csv);
                    callback(row, null);
                } else if (err) {
                    console.log('error : ', err.stack);
                    callback(null, err);
                } else {
                    callback(null, null);
                }
            });

        };
        */