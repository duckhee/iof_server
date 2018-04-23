var express = require('express');
var router = express.Router();

var device_controller = require('../../../controllers/device/device_controller');
var network_controller = require('../../../controllers/device/network_controller');
var data_controller = require('../../../controllers/device/data_controller');
var image_controller = require('../../../controllers/device/image_controller');
var IoFController = require('../../../controllers/device/iof_controller');
//router root data
router.get('/', function(req, res, next) {
    /// next();
    res.redirect('/');
});


//router insert data
router.get('/insert', function(req, res, next) {
    var query_serial = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var insert_data = req.query.value || req.params.value || req.body.value || req.param.value;
    var apikey_info = {
        serial: query_serial,
    };
    console.log('get value :::::::::::::::: ', insert_data);
    device_controller.insert_before(apikey_info, function(err, row) {
        if (err) {
            // console.log('insert before data error ::: ', err);
            res.json('failed');
        } else if (row) {
            console.log('inset before data success :::::', row.id);
            var data_info = {
                value: insert_data,
                apikey: query_serial,
                device_id: row.id,
                serial: query_serial,
                sd_address: row.address
            }
            console.log('data info :::::::::::: ', data_info.value);
            data_controller.insert_value(data_info, function(err, row) {
                if (err) {
                    res.status(404);
                } else {
                    network_controller.update_actstatus(data_info, function(err, result) {
                        if (err) {
                            console.log('updateing active network error ::::: ', err);
                            res.status(404);
                        } else {
                            console.log('success updating network set ::::: ', result);
                            res.json('success');
                        }
                    });

                }
            });
        } else {
            res.status(500);
        }
    });
});

//router insert data
router.post('/insert', function(req, res, next) {
    var query_serial = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var insert_data = req.query.value || req.params.value || req.body.value || req.param.value;
    var apikey_info = {
        apikey: query_serial,
    };
    console.log('get value :::::::::::::::: ', insert_data);
    device_controller.insert_before(apikey_info, function(err, row) {
        if (err) {
            // console.log('insert before data error ::: ', err);
            res.json('failed');
        } else if (row) {
            if (row.device_type === 'radon') {
                console.log('radon data insert ');
            } else if (row.device_type === 'IoF') {
                console.log('IoF data insert');
            } else {
                console.log('null');
            }
            console.log('inset before data success :::::', row.id);
            var data_info = {
                value: insert_data,
                apikey: query_serial,
                device_id: row.id,
                serial: query_serial,
                sd_address: row.address
            }
            data_controller.insert_value(data_info, function(err, row) {
                if (err) {
                    res.status(404);
                } else {
                    network_controller.update_actstatus(data_info, function(err, result) {
                        if (err) {
                            console.log('updateing active network error ::::: ', err);
                            res.status(404);
                        } else {
                            console.log('success updating network set ::::: ', result);
                            res.json('success');
                        }
                    })

                }
            });
        } else {
            res.status(500);
        }
    });
});

//router ajax get data json
router.get('/ajaxget', function(req, res, next) {
    var query_apikey = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var apikey_info = { serial: query_apikey };

    device_controller.find_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);
            var devicedata = { id: result.id };
            //data list info
            data_controller.list10_value(devicedata, function(err, rows) {
                if (err) {
                    console.log('get data error :::::: ', err);
                    next(err);
                } else {
                    console.log('list limit 10 :::::: ', rows);
                    res.json(rows);
                }
            });

        }
    });
});

//router ajax post data json
router.post('/ajaxget', function(req, res, next) {
    var query_apikey = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var apikey_info = { serial: query_apikey };

    device_controller.find_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);

            //data list info
            data_controller.list10_value(apikey_info, function(err, rows) {
                if (err) {
                    console.log('get data error :::::: ', err);
                    next(err);
                } else {
                    console.log('list limit 10 :::::: ', rows);
                    res.json(rows);
                }
            });

        }
    });
});


//get router insert iof data
router.get('/iofinsert', function(req, res, next) {
    var query_serial = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var insert_data = req.query.value || req.params.value || req.body.value || req.param.value;
    var apikey_info = {
        serial: query_serial,
    };
    console.log('get iof value :::::::::::::::: ', insert_data);
    device_controller.insert_before(apikey_info, function(err, row) {
        if (err) {
            // console.log('insert before data error ::: ', err);
            res.json('failed');
        } else if (row) {
            console.log('inset before iof data success :::::', row.id);
            var data_info = {
                value: insert_data,
                apikey: query_serial,
                device_id: row.id,
                serial: query_serial,
                sd_address: row.address
            }
            console.log('iof data info :::::::::::: ', data_info.value);
            IoFController.InsertValue(data_info, function(err, row) {
                if (err) {
                    res.status(404);
                } else {
                    network_controller.update_actstatus(data_info, function(err, result) {
                        if (err) {
                            console.log('updateing active network error ::::: ', err);
                            res.status(404);
                        } else {
                            console.log('success updating network set ::::: ', result);
                            res.json('success');
                        }
                    });

                }
            });
        } else {
            res.status(500);
        }
    });
});

//post router insert data
router.post('/iofinsert', function(req, res, next) {
    var query_serial = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var insert_data = req.query.value || req.params.value || req.body.value || req.param.value;
    var apikey_info = {
        apikey: query_serial,
    };
    console.log('get iof value :::::::::::::::: ', insert_data);
    device_controller.insert_before(apikey_info, function(err, row) {
        if (err) {
            // console.log('insert before data error ::: ', err);
            res.json('failed');
        } else if (row) {
            console.log('inset before iof data success :::::', row.id);
            var data_info = {
                value: insert_data,
                apikey: query_serial,
                device_id: row.id,
                serial: query_serial,
                sd_address: row.address
            }
            IoFController.InsertValue(data_info, function(err, row) {
                if (err) {
                    res.status(404);
                } else {
                    network_controller.update_actstatus(data_info, function(err, result) {
                        if (err) {
                            console.log('updateing active network error ::::: ', err);
                            res.status(404);
                        } else {
                            console.log('success updating network set ::::: ', result);
                            res.json('success');
                        }
                    })

                }
            });
        } else {
            res.status(500);
        }
    });
});

//get rout ajax get iof data
router.get('/iofajaxget', function(req, res, next) {
    var query_apikey = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var apikey_info = { serial: query_apikey };

    device_controller.find_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);
            var devicedata = { id: result.id };
            //data list info
            IoFController.ListLimit10(devicedata, function(err, rows) {
                if (err) {
                    console.log('get data error :::::: ', err);
                    next(err);
                } else {
                    console.log('list limit 10 :::::: ', rows);
                    res.json(rows);
                }
            });

        }
    });
});

//post rout ajax get iof data 
router.post('/iofajaxget', function(req, res, next) {
    var query_apikey = req.query.serial || req.params.serial || req.body.serial || req.param.serial;
    var apikey_info = { serial: query_apikey };

    device_controller.find_device(apikey_info, function(err, result) {
        if (err) {
            console.log('check device error :::::', err);
            next(err);
        } else {
            console.log('device search id ::::', result);
            var devicedata = { id: result.id };
            //data list info
            IoFController.ListLimit10(devicedata, function(err, rows) {
                if (err) {
                    console.log('get data error :::::: ', err);
                    next(err);
                } else {
                    console.log('list limit 10 :::::: ', rows);
                    res.json(rows);
                }
            });
        }
    });
});


//router ajax image get
router.get('/listajaximage', function(req, res, next) {

    console.log('list image ajax router');

    next();
});

//router ajax image one 
router.get('/ajaximage', function(req, res, next) {
    var get_serial = req.query.serial || req.body.serial || req.params.serial || req.param.serial;
    console.log('get serial :::::::: ', get_serial);
    var imageInof = { "serial": get_serial };
    image_controller.find_image(imageInof, function(err, result) {
        if (err) {
            console.log('image find error ::::: ', err);
            console.log('image find error stack :::::: ', err.stack);
            console.log('image find error code :::::: ', err.code);
        } else if (result) {
            res.json(result);
        } else {
            res.json('null');
        }
    });
});

//router ajax  text data
router.get('/ajaxtext', function(req, res, next) {
    console.log('text data router');
    next();
})

module.exports = router;