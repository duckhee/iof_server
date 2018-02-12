var express = require('express');
var router = express.Router();

//controller boarder
var boarder_controller = require('../../controllers/board/board_controller');
var reply_controller = require('../../controllers/board/reply_controller');
//my util
var util_make = require('../../util/util');


//boarder root get router
router.get('/', function(req, res, next){
    console.log('boarder root get router');
   
     res.redirect('/boards/list');
});

//boarder list page router
router.get('/list', function(req, res, next){
    console.log('boarder list get router');
    boarder_controller.start_list(function(err, row){
        if(err){
            console.log('boarder list error : ', err);
             res.json(err);
        }else {
            console.log('boarder data : ',row);
            //var checking = util_make.inEmpty(row);
            //console.log('checking data : ', checking);
            res.render('boarder/listPage',{
                post:row
            });
        }
    });
    
});

//boarder list page router
router.post('/process/list', function(req, res, next){
    console.log('boarder list post router');
    var postid = req.body.id || req.query.id || req.param.id || req.params.id;
    
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
//router.get('/')



module.exports = router;