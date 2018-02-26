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
            type: DataTypes.STRING,
            allowNull: false,

        },
        device_address: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                device.belongsTo(models.user, {
                    foreignKeyConstraint: true,
                    foreignKey: 'device_apikey',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });

                device.hasMany(models.device_network, {
                    foreignKey: 'sn_serial', //has사용시는 상대방 ?? 자기자신도 가능 ?
                    onDelete: 'CASCADE',
                    allowNull: false,
                    foreignKeyConstraint: true
                });
            }
        }
    });

    device.associate = function(models) {
        device.belongsTo(models.user, {
            foreignKeyConstraint: true,
            foreignKey: 'device_apikey',
            allowNull: false,
            onDelete: 'CASCADE',
        });

        device.hasMany(models.device_network, {
            foreignKey: 'sn_serial', //has사용시는 상대방 ?? 자기자신도 가능 ?
            onDelete: 'CASCADE',
            allowNull: false,
            foreignKeyConstraint: true
        });
    }


    return device;
};