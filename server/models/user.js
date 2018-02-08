'use strict';

var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
            user_id: {
                type: DataTypes.STRING,
                unique: true,
            },
            user_password: {
                type: DataTypes.STRING,
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
            apikey: {
                type: DataTypes.STRING,
                unique: true,
            }
        }, {
            classMethods: {
                associate: function(models) {
                    // associations can be defined here
                    user.hasMany(models.device, {
                        foreignKey: 'apikey',
                        onDelete: 'CASCADE'
                    });
                }
            }
        },

    );
    //insert before 
    user.hook("beforeCreate", function(user) {
        user.user_password = bcrypt.hashSync(user.user_password, bcrypt.genSaltSync(10), null);
        console.log('before Create hook >>>>>>>>', user.user_password);
    });
    return user;
};