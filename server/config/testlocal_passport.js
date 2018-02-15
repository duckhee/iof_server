var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        //세션에 사용자 정보 등록
        //user id callback
        // done(user.id, null);
        console.log(user);
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

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'userid',
            passpowrField: 'password',
            passReqToCallback: true //allows us to pass back the entire request to the callback
        },

        function(req, userid, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    userid: userid
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, { message: 'that email is already taken' });
                } else {
                    var userPassword = generateHash(passowrd);
                    var data = {
                        userid: userid,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };

                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }

    ));

    //local signup
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(req, email, password, done) {
            var User = user;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }

                if (!isValidPassword(user.password, passsword)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log('Error : ', err);
                return done(null, false, { message: 'something went wrong with your Signin' });
            });
        }
    ));
};