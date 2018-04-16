'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
            user_id: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false 
                /*
                validate: {
                    notNull: true,
                    notNull(val) {
                        if (!val) {
                            throw new Error('이름이 입력되지 않았습니다.');
                        }
                    }
                }
                */
            },
            user_level:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            user_name: {
                type: DataTypes.STRING,
            },
            user_email: {
                type: DataTypes.STRING,
                unique: true
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_phone1: {
                type: DataTypes.INTEGER,
            },
            user_phone2: {
                type: DataTypes.INTEGER,
            },
            user_phone3: {
                type: DataTypes.INTEGER,
            },
            user_address1: {
                type: DataTypes.STRING,
            },
            user_address2: {
                type: DataTypes.STRING,
            },
            user_zipcode: {
                type: DataTypes.STRING
            },
            user_status: {
                type: DataTypes.ENUM,
                values: ['active', 'inactive'],
                defaultValue: 'active'
            },
            apikey: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        }, {
            getterMethods: {
                fullName: function() {
                    return "user id : " + this.user_id + "user pw : " + this.user_password + "user name : " + this.user_name +
                        "user phone : " + this.user_phone1 + "-" + this.user_phone2 + "-" + this.user_phone3 +
                        "user address : " + this.user_address1 + ", " + this.user_address2 + 'user email : ' + this.user_email +
                        "user zipcode : " + this.user_zipcode + "user status : " + this.user_status + "user apikey : " + this.apikey;
                }
            },
            /*
            validate:{
                validPassword: function(user_password, next) {
                    //return bcrypt.compare(user_password, this.user_password, next);
                    return bcrypt.compareSync(user_password, this.user_password);
                }
            },
            */
           
            classMethods: {
                /*
                validPassword: function(password, passwd, callback) {
                    console.log('validPassword password', password);
                    console.log('validPassword passwd', passwd);
                    bcrypt.compare(password, passwd, function(err, isMatch) {
                      console.log('isMatch', isMatch);
                      if (isMatch) {
                        console.log('found match');
                        return callback(null, true);
                      } else {
                        console.log('returning false');
                        return callback(null, false);
                      }
                    });
                  },
                  */
                associate: function(models) {
                    // associations can be defined here

                    models.user.hasMany(models.device_network, {
                        foreignKey: 'apikey',
                        onDelete: 'CASCADE'
                    });

                    models.user.hasMany(models.tbl_board, {
                        foreignKey: 'user_id',
                        onDelete: 'CASCADE'
                    });

                    models.user.hasMany(models.tbl_reply, {
                        foreignKey: 'user_id',
                        onDelete: 'CASCADE'
                    });
                    models.user.hasMany(models.device, {
                        foreignKey: 'apikey',
                        onDelete: 'CASCADE'
                    });
                    //  user.hasMany(models.device_network);
                    //  user.hasMany(models.tbl_board);
                    //  user.hasMany(models.tbl_reply);
                },
            },
            instanceMethods: {
                generatehash: function(user_password, done) {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hashSync(user_password, salt, null, done);
                        //return bcrypt.hashSync(user_password, salt, null, done);
                    });
                },
                validPassword: function(user_password, next) {
                    //return bcrypt.compare(user_password, this.user_password, next);
                    return bcrypt.compareSync(user_password, this.user_password);
                }
            },


        }

    );
    /*
    user.beforeCreate(function(model, done){
        model.user.generatehash(model.user.user_password, function(err, encrypted){
            if(err)
            {
                return done(err);
            }
            model.user.user_password = encrypted;
            done();
        });
    });
    
    user.beforeFind(function(model, done){
        console.log('testing before find hook >>>>>>>>>>>>>', model);
        done();
    })
    */
   // return user;
    /*
    //insert before
    user.hook("beforeCreate", function(user) {
        user.user_password = bcrypt.hashSync(user.user_password, bcrypt.genSaltSync(10), null);
        console.log('before Create hook >>>>>>>>', user.user_password);
    });
    
    user.hook("beforeFind", function(user){
        console.log('insert user password ::::::::::: ',user.user_password);
        //user.user_password = bcrypt.compareSync(user.user_password,bcrypt.genSaltSync(10));
        console.log('find before >>>>>>>>>>>>>>>>>>>', user.user_password);
     
    });

    */

    return user;

};