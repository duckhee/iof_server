'use strict';
module.exports = function(sequelize, DataTypes) {
    var radon_value = sequelize.define('radon_value', {
        rd_value: {
            type: DataTypes.STRINNG
        },
        deviceId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'device',
                key: 'id'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        td_data: {
            type: DataTypes.TEXT
        },
        rd_serial: {
            type: DataTypes.STRING,
            references: {
                model: 'device',
                key: 'device_serial'
            },
            allowNull: false,
            onDelete: 'CASCADE',
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.radon_value.belongsTo(models.device, {
                    foreignKeyConstraint: true,
                    foreignKey: 'id',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });

            }
        }
    });
    radon_value.associate = function(models) {
        radon_value.belongsTo(models.deivce, {
            foreignKey: 'deviceId',
            foreignKeyConstraint: true,
            allowNull: false
        });
    }
    return radon_value;
};