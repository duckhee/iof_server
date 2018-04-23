'use strict';
module.exports = function(sequelize, DataTypes) {
    var device_setting = sequelize.define('device_setting', {
        st_serial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deviceId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'device',
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        },
        st_address: {
            type: DataTypes.STRING,
        },
        st_apikey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        st_title: {
            type: DataTypes.STRING,
        },
        st_gps: {
            type: DataTypes.STRING,
        },
        st_ping: {
            type: DataTypes.INTEGER,
        },
        st_group: {
            type: DataTypes.INTEGER,
        },
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.associate.belongsTo(models.device, {
                    foreignKeyConstraint: true,
                    foreignKey: 'id',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });
            }
        }
    });

    device_setting.associate = function(models){
        device_setting.belongsTo(models.device, {
            foreignKeyConstraint: true,
            foreignKey: 'id',
            allowNull: false,
            onDelete: 'CASCADE',
        });
    }
    
    return device_setting;
};

/*
  카메라 저장을 위한 객체 
  시리얼 번호 이거는 디바이스 이름
  apikey는 보안을 위해서 사용
  path는 카메라 저장 위치()
  filename은 파일 이름을 저장
  filesize는 이미지 파일의 크기
*/