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
    var bno = req.body.bno || req.query.bno || req.param.bno || req.params.bno;

    var boarder_info = {
        bno: bno
    };
    if (boarder_info.bno) {
        boarder_controller.upcount(boarder_info, function(err, result) {
            if (err) {
                console.log('boarder count error : ', err);
            } else if (result) {
                console.log('boarder result upcount : ', result);
            } else {
                console.log('null');
            }
        });
        boarder_controller.read_post(boarder_info, function(err, result) {
            if (err) {
                console.log('boarder read error : ', err);
                res.redirect('/');
            } else if (result) {
                console.log(result);
                res.render('boarder/readPage', {
                    posts: result
                });
            } else {
                res.redirect('/boards/read?bno=' + bno);
            }
        });
    } else {
        res.render('boarder/listPage');
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
    var board_writer = 'fain9301'; //testing join
    var board_info = {
        title: board_title,
        content: board_content,
        writer: board_writer
    };

    boarder_controller.create(board_info, function(err, row) {
        if (err) {
            console.log('boarder registe error : ', err);
            res.status(404);
        } else if (row) {
            console.log('boarder registe success ');
            res.redirect('/boards/list');
        } else {
            console.log('boarder create null');
            res.status(500);
        }
    });
});

//boarder remove page router
router.get('/remove', function(req, res, next) {
    console.log('remove get router');
    var bno = req.query.bno || req.param.bno || req.body.bno || req.params.bno;
    console.log('bno ::::: ', bno);
    var boarder_info = { bno: bno };
    boarder_controller.delete_boarder(boarder_info, function(err, row) {
        if (err) {
            console.log('remove boarder error :', err);
            res.redirect('/boards/process/remove?bno=' + bno);
        } else {
            console.log('boarder delete success ');
            res.redirect('/boards/list');
        }
    });
});

//boarder remove page router
router.post('/process/remove', function(req, res, next) {
    console.log('remove post router');
    res.redirect('/boards/remove?bno=' + req.params.bno);

});

//boarder modify page router
router.get('/modify', function(req, res, next) {
    console.log('boarder modify get router');
    var post_id = req.query.bno || req.body.bno || req.param.bno || req.params.bno;
    console.log('modify bno :::::', post_id);
    var post_info = {
        bno: post_id
    }
    boarder_controller.modify_start(post_info, function(err, row) {
        if (err) {
            console.log('modify read boarder error : ', err);
            res.redirect('/boards/modify');
        } else {
            res.render('boarder/modifyPage', {
                posts: row
            });
        }
    })


});

//boarder modify page router
router.post('/process/modify', function(req, res, next) {
    console.log('boarder modify post router');
    var title = req.body.title;
    var content = req.body.modify_content;
    var writer = req.body.writer;

    var modify_info = { title: title, content: content, writer: writer };
    next();
});


//json data는 body로 날라온다 ????? form에 담겨있어서 ? 

//boarder reply router ajax ? 
router.get('/create/reply', function(req, res, next) {
    console.log('create reply get router');
    next();
});

//boarder reply router ajax ? post
router.post('/process/create/reply', function(req, res, next) {
    console.log('create reply post router');
    var reply_info = {
        bno: req.body.bno,
        rwriter: req.body.rwriter,
        rcontent: req.body.rcontent
    };
    reply_controller.create_reply(reply_info, function(err, new_value) {
        if (err) {
            next();
        } else if (new_value) {
            var reply_info = { bno: new_value.tblBoardId };
            reply_controller.list_reply(reply_info, function(err, rows) {
                if (err) {
                    next();
                } else if (rows) {
                    res.json(rows);
                } else {
                    next();
                }
            });
        } else {
            next();
        }
    });

})

//boarder reply list router ajax?
router.get('/list/reply', function(req, res, next) {
    next();
});

//boarder modify reply router ajax?
router.get('/modify/reply', function(req, res, next) {
    next();
});

//boader delete reply router ajax?
router.get('/delete/reply', function(req, res, next) {
    next();
});

//boarder delete reply router ajax ? 
router.post('/process/delete/reply', function(req, res, next) {
    console.log('rseq : ', req.body.rseq);
    console.log('bno : ', req.body.bno);
    var reply_info = {
        bno: req.body.bno,
        id: req.body.rseq
    };
    reply_controller.delete_reply(reply_info, function(err, row) {
        if (err) {
            console.log(err);
            next();
        } else if (row) {
            reply_controller.list_reply(reply_info, function(err, rows) {
                if (err) {
                    next();
                } else if (rows) {
                    res.json(rows);
                } else {
                    next();
                }
            });
        } else {
            next();
        }
    });
});

module.exports = router;