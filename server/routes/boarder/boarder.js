var express = require('express');
var router = express.Router();

//controller boarder
var boarder_controller = require('../../controllers/board/board_controller');
var reply_controller = require('../../controllers/board/reply_controller');
//my util
var util_make = require('../../util/util');


//boarder root get router
router.get('/', function(req, res, next) {
    console.log('boarder root get router');

    res.redirect('/boards/list');
});

//boarder list page router
router.get('/list', function(req, res, next) {
    console.log('boarder list get router');
    boarder_controller.start_list(function(err, row) {
        if (err) {
            console.log('boarder list error : ', err);
            //res.json(err);
            next(err);
        } else {
            res.render('boarder/listPage', {
                post: row
            });
        }
    });
});

//boarder list page router
router.post('/process/list', function(req, res, next) {
    console.log('boarder list post router');
    /*
    var postid = req.body.id || req.query.id || req.param.id || req.params.id;
    var post_info = {
        index: postid
    };
    boarder_controller.read(post_info, function(err, row) {
        if (err) {
            console.log('process list boarder error : ', err);
            next();
        } else if (row) {
            console.log('success list get', row);
            next();
        } else {
            console.log('proccess list boarder null');
            next(); //next(router)
        }
    });
    //res.send('/read?id=' + postid);//read page로 이동 ? 
    */
    next();
});

//boarder read page router
router.get('/read', function(req, res, next) {
    console.log('boarder read get router');
    var boarder_id = req.body.bno || req.query.bno || req.param.bno || req.params.bno;

    var boarder_info = {
        index: boarder_id
    };
    if (boarder_info.index) {
        boarder_controller.read(boarder_info, function(err, row) {
            if (err) {
                console.log('boarder read error : ', err);
                res.redirect('/boards/read');
            } else if (row) {
                console.log('boarder read page get : ', row);
                res.render('boarder/readPage', {
                    post: row
                });
            } else {
                res.redirect('/boards/read');
            }
        });
    } else {
        res.render('boarder/readPage');
    }
});

//boarder read page router
router.post('/read', function(req, res, next) {
    console.log('boarder read post router');
    res.redirect('/boards/read');
});

//boarder registe page router
router.get('/registe', function(req, res, next) {
    console.log('boarder registe get router');
    res.render('boarder/registePage');
})

//boarder registe page router
router.post('/process/registe', function(req, res, next) {
    console.log('boarder registe post router');

    var board_title = req.body.title || req.query.title || req.param.title || req.params.title;
    var board_content = req.body.editor1 || req.query.editor1 || req.param.editor1 || req.params.editor1;

    var board_info = {};

    boarder_controller.create(board_info, function(err, row) {
        if (err) {
            console.log('boarder registe error : ', err);
        } else if (row) {
            console.log('boarder registe success ');
        } else {
            console.log('boarder create null');
        }
    });

    res.redirect('/boards/list');
})

//boarder modify page router
router.get('/modify', function(req, res, next) {
    console.log('boarder modify get router');
    var post_id = req.query.id || req.body.id || req.param.id || req.params.id;
    var post_info = {
        index: post_id
    }
    boarder_controller.modify(post_info, function(err, row) {
        if (err) {
            console.log('modify read boarder error : ', err);
            res.redirect('/boards/modify');
        } else {
            res.render('boarder/list');
        }
    })

    res.render('boarder/modifyPage');
});

//boarder modify page router
router.post('/modify', function(req, res, next) {
    console.log('boarder modify post router');
    next();
});

//boarder reply router ajax ? 
router.get('/create/reply', function(req, res, next) {
    next();
});

//boarder reply list router ajax?
router.get('/list/reply', function(req, res, next) {

});

//boarder modify reply router ajax?
router.get('/modify/reply', function(req, res, next) {

});

//boader delete reply router ajax?
router.get('/delete/reply', function(req, res, next) {

});


module.exports = router;