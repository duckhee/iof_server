'use strict';
module.exports = function(sequelize, DataTypes) {
  var device_setting = sequelize.define('device_setting', {
    st_serial: DataTypes.STRING,
    st_address: DataTypes.STRING,
    st_apikey:DataTypes.STRING,
    st_title: DataTypes.STRING,
    st_gps: DataTypes.STRING,
    st_ping: DataTypes.INTEGER,
    st_group: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
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