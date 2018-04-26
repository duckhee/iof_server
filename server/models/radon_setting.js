'use strict';
module.exports = function(sequelize, DataTypes) {
    var radon_setting = sequelize.define('radon_setting', {
        deviceId: {
            type: DataTypes.INTEGER,
            referencs: {
                model: 'device',
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        sr_serial: {
            type: DataTypes.STRING,
            referencs: {
                model: 'device',
                key: 'device_serial'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        },
        sr_address: {
            type: DataTypes.STRING,
        },
        sensing_time: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    radon_setting.associate = function(models) {

        radon_setting.belongsTo(models.device, {
            foreignKeyConstraint: true,
            foreignKey: 'id',
            allowNull: false,
            onDelete: 'CASCADE',
        });

        radon_setting.belongsTo(models.device, {
            foreignKeyConstraint: true,
            foreignKey: 'device_serial',
            allowNull: false,
            onDelete: 'CASCADE',
        })

    }

    return radon_setting;
};