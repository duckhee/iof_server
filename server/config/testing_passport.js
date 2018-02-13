var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var kakaoStrategy = require('passport-kakao').Strategy;
var models = require('../models/index');
var user = require('../models/user');
var user_controllers = require('../controllers/user_controllers');

//passport를 인자를 받은 함수를 리턴 해준다. 
module.exports = function(passport, users) {

    passport.use('kakao-login', new Strategy({
        clientID: '',
        callbackURL: ''
    }, function(accessToken, refreshToken, profile, done) {

    }));

    passport.use('local-login', new Strategy({
        usernameField: 'userid',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, userid, password, done) {
        models.user.findOne({
            where: {
                userid: userid,
                password: password
            }
        }).then(function(row) {
            if (!row) {
                return done(null, false);
            }
        }).catch(function(err) {
            console.log('login passport error : ', err);
            return done(null, false);
        });
    }));


    //로그인 처리 
    passport.serializeUser(function(user, done) {
        console.log('save session', user);
        done(null, user.id);
    });

    //로그아웃 처리 
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('delete session', user);
            done(err, user);
        });
    });
};