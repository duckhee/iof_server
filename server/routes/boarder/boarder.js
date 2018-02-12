var express = require('express');
var router = express.Router();

//controller boarder
var boarder_controller = require('../../controllers/board/board_controller');
var reply_controller = require('../../controllers/board/reply_controller');

//boarder root get router
router.get('/', function(req, res, next){
    console.log('boarder root get router');
    res.render('boarder/listPage');
})

//boarder list page router
router.get('/list', function(req, res, next){
    console.log('boarder list get router');
    res.render('boarder/listPage');
});

//boarder list page router
router.post('/process/list', function(req, res, next){
    console.log('boarder list post router');
    next();    
});

//boarder registe page router
router.get('/registe', function(req, res, next){
    console.log('boarder registe get router');
    res.render('boarder/registePage');
})

//boarder registe page router
router.post('/process/registe', function(req, res, next){
    console.log('boarder registe post router');
    next();
})

//boarder modify page router
router.get('/modify', function(req, res, next){
    console.log('boarder modify get router');
    res.render('boarder/modifyPage');
});

//boarder modify page router
router.post('/modify', function(req, res, next){
    console.log('boarder modify post router');
    next();
})

//boarder reply router




module.exports = router;