'use strict';
module.exports = function(sequelize, DataTypes) {
    var device_network = sequelize.define('device_network', {
        sn_serial: {
            type: DataTypes.STRING,
        },
        sn_apikey: {
            type: DataTypes.STRING,
            unique: true,
            references: {
                model: 'user',
                key: 'apikey'
            }
        },
        sn_address: {
            type: DataTypes.STRING,
        },
        sn_type: {
            type: DataTypes.STRING,
        },
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
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