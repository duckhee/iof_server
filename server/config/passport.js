var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models/index');
var user = require('../models/user');

//user controller add
var user_controller = require('../controllers/user/user_controller');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        //세션에 사용자 정보 등록
        console.log('save session : ', user);
        done(null, user.id);
    });
    //user to deserialize the user
    passport.deserializeUser(function(id, dnoe) {
        //세션에 기록된 사용자 정보를 얻어온다.
        console.log('delete session : ', id);
        user.findById(id).then(function(user) {
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


    /*
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'id',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                user.findOne({
                    'local.id': id
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    } else if (user) {
                        return done(null, false);
                    } else {



                    }
                })
            })
        }));
        */
    /*
        // route middleware to make sure a user is logged in
        function isLoggedIn(req, res, next) {

            // if user is authenticated in the session, carry on 
            if (req.isAuthenticated())
                return next();

            // if they aren't redirect them to the home page
            res.redirect('/');
        }
    */

}