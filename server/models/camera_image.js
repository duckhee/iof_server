'use strict';
module.exports = function(sequelize, DataTypes) {
    var camera_image = sequelize.define('camera_image', {
        si_serial: {
            type: DataTypes.STRING,
            references: {
                model: 'device',
                key: 'device_serial'
            },
            allowNull: false,
            onDelete: 'CASCADE'
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
        si_apikey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        si_path: {
            type: DataTypes.STRING,
        },
        si_filename: {
            type: DataTypes.STRING,
        },
        si_filesize: {
            type: DataTypes.STRING,
        },

    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                

            }
        }
    });
    return camera_image;
};

/*
  카메라 저장을 위한 객체 
  시리얼 번호 이거는 디바이스 이름
  apikey는 보안을 위해서 사용
  path는 카메라 저장 위치()
  filename은 파일 이름을 저장
  filesize는 이미지 파일의 크기
*/