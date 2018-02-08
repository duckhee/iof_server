'use strict';

var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
            user_id: {
                type: DataTypes.STRING,
                unique: true,
            },
            user_password: DataTypes.STRING,
            user_name: DataTypes.STRING,
            user_phone1: DataTypes.INTEGER,
            user_phone2: DataTypes.INTEGER,
            user_phone3: DataTypes.INTEGER,
            user_address1: DataTypes.STRING,
            user_address2: DataTypes.STRING,
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