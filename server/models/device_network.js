'use strict';
module.exports = function(sequelize, DataTypes) {
    var device_network = sequelize.define('device_network', {

        sn_apikey: {
            type: DataTypes.STRING,
            unique: true,
            references: {
                model: 'user',
                key: 'apikey'
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        sn_serial: {
            type: DataTypes.STRING,
            references: {
                model: 'device',
                key: 'device_serial'
            },

            allowNull: false,
            onDelete: 'CASCADE',
        },
        sn_address: {
            type: DataTypes.STRING,
        },
        sn_type: {
            type: DataTypes.STRING,
        },
        sn_status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'inactive'
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                device_network.belongTo(models.user, {
                    foreignKeyConstraint: true,
                    foreignKey: 'sn_apikey',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });
                device_network.belongTo(models.device, {
                    foreignKeyConstraint: true,
                    foreignKey: 'device_serial',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });
            }
        }
    });

    device_network.associate = function(models) {
        device_network.belongsTo(models.user, {
            foreignKeyConstraint: true,
            foreignKey: 'apikey',
            allowNull: false,
            onDelete: 'CASCADE',
        });
        device_network.belongsTo(models.device, {
            foreignKeyConstraint: true,
            foreignKey: 'sn_serial',
            allowNull: false,
            onDelete: 'CASCADE',
        });
    }


    return device_network;
};

/*
  카메라 저장을 위한 객체 
  시리얼 번호 이거는 디바이스 이름
  apikey는 보안을 위해서 사용
  path는 카메라 저장 위치()
  filename은 파일 이름을 저장
  filesize는 이미지 파일의 크기
*/