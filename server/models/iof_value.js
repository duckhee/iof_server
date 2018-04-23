'use strict';
module.exports = function(sequelize, DataTypes) {
    var iof_value = sequelize.define('iof_value', {

        deviceId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'device',
                key: 'id'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        id_data: {
            type: DataTypes.TEXT
        },
        id_serial: {
            type: DataTypes.STRING,
            references: {
                model: 'device',
                key: 'device_serial'
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        id_address: {
            type: DataTypes.STRING
        },
        id_text: {
            type: DataTypes.TEXT
        },

    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.iof_value.belongsTo(models.device, {
                    foreignKeyConstraint: true,
                    foreignKey: 'id',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });
            }
        }
    });
    iof_value.associate = function(models) {
        iof_value.belongsTo(models.device, {
            foreignKey: 'deviceId',
            foreignKeyConstraint: true,
            allowNull: false
        });
    }

    return iof_value;
};