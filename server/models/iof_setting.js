'use strict';
module.exports = function(sequelize, DataTypes) {
    var iof_setting = sequelize.define('iof_setting', {
        deviceId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'device',
                key: 'id'
            }
        },
        sd_serial: {
            type: DataTypes.STRING,
            references: {
                model: 'device',
                key: 'device_serial'
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        sd_address: {
            type: DataTypes.STRING,
        },
        water_time: {
            type: DataTypes.INTEGER,
            defaultValue: 5
        },
        camera_time: {
            type: DataTypes.INTEGER,
            defaultValue: 30
        },
        sensing_time: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.iof_setting.belongsTo(models.device, {
                    foreignKeyConstraint: true,
                    foreignKey: 'id',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });

            }
        }
    });
    iof_setting.associate = function(models) {
        iof_setting.belongsTo(models.device, {
            foreignKeyConstraint: true,
            foreignKey: 'id',
            allowNull: false,
            onDelete: 'CASCADE',
        });

        iof_setting.belongsTo(models.device, {
            foreignKeyConstraint: true,
            foreignKey: 'device_serial',
            allowNull: false,
            onDelete: 'CASCADE',
        })
    }
    return iof_setting;
};