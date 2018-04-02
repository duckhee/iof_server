var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models/index');
var user = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        //세션에 사용자 정보 등록
        done(null, user.id);
    });
    //user to deserialize the user
    passport.deserializeUser(function(id, dnoe) {
        //세션에 기록된 사용자 정보를 얻어온다.
        User.findById(id).then(function(user) {
            if (user) {
                console.log(user);
                done(null, user.get());
                //done(user.get(), null);
            } else {
                console.log(user.errors);
                done(user.errors, null);
                //done(null, user.errors);
            }
        });
    });

    //strategy set function


}