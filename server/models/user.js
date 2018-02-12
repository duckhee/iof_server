'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
            user_id: {
                type: DataTypes.STRING,
                unique: true,
                allowNull:false
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING,
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
            user_zipcode:{
                type:DataTypes.STRING
            },
            user_email:{
                type:DataTypes.STRING,
                unique:true
            },
            user_status:{
                type:DataTypes.ENUM,
                values: ['active', 'inactive'],
                defaultValue: 'active'
            },
            apikey: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        }, 
        {
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                    
                      user.hasMany(models.device_network, {
                          foreignKey: 'apikey',
                          onDelete: 'CASCADE'
                      });

                      user.hasMany(models.tbl_board, {
                          foreignKey: 'user_id',
                          onDelete: 'CASCADE'
                      });

                      user.hasMany(models.tbl_reply, {
                          foreignKey: 'user_id',
                          onDelete: 'CASCADE'
                      });
                      
                  //  user.hasMany(models.device_network);
                  //  user.hasMany(models.tbl_board);
                  //  user.hasMany(models.tbl_reply);
                },
            },
            instanceMethods:{
                generatehash : function(user_password, done){
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hashSync(user_password, salt, null, done);
                    });
                },
                validPassword : function(user_password, next){
                     bcrypt.compare(user_password, this.user_password, next);

                }
            },
            
            
        }
        
    );
    /*
    user.beforeCreate(function(model, done){
        model.generatehash(model.user_password, function(err, encrypted){
            if(err)
            {
                return done(err);
            }
            model.password = encrypted;
            done();
        });
    }); 
    return user;
    */
    //insert before
    
    user.hook("beforeCreate", function(user) {
        user.user_password = bcrypt.hashSync(user.user_password, bcrypt.genSaltSync(10), null);
        console.log('before Create hook >>>>>>>>', user.user_password);
    });
    return user;
    
};