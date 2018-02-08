var express = require('express');
var router = express.Router();

var fs = require('fs');
var downloader = require('../../util/file');
var util_make = require('../../util/util');

var setting_controller = require('../../controllers/device_setting_controller');
var data_controller = require('../../controllers/data_controller');
var camera_controller = require('../../controllers/image_controller');
var network_controller = require('../../controllers/network_controller');


