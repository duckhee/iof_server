var models = require('../../models/index');
var tbl_board = require('../../models/tbl_board');
var moment = require('moment');


//board insert create
exports.create = function(boarder_info, callback) {
    models.tbl_board.create({
        title: boarder_info.title,
        content: boarder_info.content,
        writer: boarder_info.writer
    }).then(function(row) {
        callback(null, row);
    }).catch(function(err) {
        callback(err, null);
    });
};

//board insert
exports.insert = function(boarder_info, callback) {
    models.tbl_board.findOrCreate({
        where: {

        },
        /*
        include :[{
            model:models.user, 
            attributes:'user_id',
            where:{
                user_id:data_info.user_id
        }}],
        */
        default: {

        }
    }).spread((user, created) => {
        if (created) {
            callback(null, null, created);
        } else {
            callback(null, user.dataValues, null);
        }
    }).catch((err) => {
        callback(err, null, null);
    });
};

//read post 
exports.read_post = function(data_info, callback) {
    models.tbl_board.findAll({
        where: {
            id: data_info.bno
        }
    }).then((result) => {
        //console.log('testing result  : ', result);
        var loopIndex = 0;
        for (let tbl_board of result) {
            models.tbl_board.find({
                include: {
                    model: models.tbl_reply,
                    where: {
                        tblBoardId: tbl_board.id
                    }
                }
            }).then((result2) => {
                console.log('testing result2 :::::', result2);
                if (result2) {
                    console.log('testing result2 : ', result2.tbl_replies);
                    tbl_board.tbl_replies = result2.tbl_replies;
                }
                loopIndex++;
                if (loopIndex === result.length) {
                    console.log('testing result : ', result);
                    callback(null, result);
                }
            }).catch((err) => {
                console.log('result2 error : ', err);
                callback(err, null);
            });
        }
    }).catch((err) => {
        console.log('result error : ', err);
        callback(err, null);
    })
}

//create read tbl board detail
/*
exports.read = function(data_info, callback) {
    models.tbl_board.findAll({
        where: {
            id: data_info.index
        },
        include: [{
            all: true,
            model: models.tbl_reply
        }]
    }).then((row) => {
        var result = {};
        console.log('testing get row : ', row);
        models.tbl_board.find({
            include: [{
                model: models.tbl_reply,
                where: {
                    bno: data_info.index
                }
            }]
        }).then((join_row) => {
            console.log('testing join : ', join_row);
            result = { board: row, reply: join_row };
            callback(null, result);
        }).catch(err => {
            console.log('get reply error : ', err);
            callback(err, null);
        });
        result = { board: row };
        console.log(row);
        callback(null, result);
    }).catch((err) => {
        callback(err, null);
    });
};
*/
//board start list
exports.start_list = function(callback) {
    models.tbl_board.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(rows) {

        console.log('rows : ', rows);
        callback(null, rows);
    }).catch(function(err) {
        console.log('error : ', err);
        callback(err, null);
    })
}

//board list 
exports.list = function(data_info, callback) {
    models.tbl_board.findAll({
        where: {

        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(rows) {
        callback(null, rows);
    }).catch(function(err) {
        callback(err, null);
    });
};

//update count
exports.upcount = function(data_info, callback) {
    models.tbl_board.update({
        viewcnt: models.sequelize.literal('viewcnt + 1')
    }, {
        where: {
            id: data_info.bno
        },
        /*
        include :[{
            model:models.user, 
            attributes:'user_id',
            where:{
                user_id:data_info.user_id
        }}],
        */
    }).then((row) => {
        console.log(' board update count : ', row);
        callback(null, row);
    }).catch((err) => {
        console.log('board update error : ', err);
        callback(err, null);
    });
};

//boarder modify
exports.modify = function(boarder_info, callback) {
    models.tbl_board.update({
        title: boarder_info.title,
        content: boarder_info.content,
    }, {
        where: {
            id: boarder_info.post_id
        },
        include: [{
            model: models.user,
            attributes: 'user_id',
            where: {
                user_id: boarder_info.user_id
            }
        }]
    }).then(row => {
        console.log('modify boarder : ', row);
        callback(null, row);
    }).catch(err => {
        console.log('modify boarder error : ', err);
        callback(err, null);
    })
}