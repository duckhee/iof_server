'use strict';
module.exports = function(sequelize, DataTypes) {
    var device_value = sequelize.define('device_value', {
        sd_serial: {
            type: DataTypes.STRING,
            references: {
                model: '',
                key: ''
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        sd_apikey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
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
        sd_address: {
            type: DataTypes.STRING,
        },
        sd_text: {
            type: DataTypes.TEXT
        },
        sd_data: {
            type: DataTypes.STRING,
        },
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.device_value.belongsTo(models.device, {
                    foreignKeyConstraint: true,
                    foreignKey: 'id',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });
            }
        }
    });

    device_value.associate = function(models) {
        device_value.belongsTo(models.device, {
            foreignKey: 'deviceId',
            foreignKeyConstraint: true,
            allowNull: false
        });
        /*
        device_value.belongsTo(models.user, {
            foreignKeyConstraint: true,
            foreignKey: 'rwriter',
            allowNull: false
        });
        */
    }
    return device_value;
};

/*
  value는 데이터 값
  시리얼 번호 이거는 디바이스 이름
  apikey 보안을 위해서 사용
  address는 위치 
*/