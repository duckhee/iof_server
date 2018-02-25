'use strict';
module.exports = function(sequelize, DataTypes) {
    var device = sequelize.define('device', {
        device_name: {
            type: DataTypes.STRING
        },
        device_apikey: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'apikey'
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        device_num: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        device_serial: {
            type: DataTypes.STRING
        },
        device_address: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                device.hasMany(models.user, {
                    foreignKeyConstraint: true,
                    foreignKey: 'apikey',
                    allowNull: false
                });
            }
        }
    });
    return device;
};