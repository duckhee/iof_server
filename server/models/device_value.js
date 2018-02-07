'use strict';
module.exports = function(sequelize, DataTypes) {
  var device_value = sequelize.define('device_value', {
    sd_serial:  {
      type:DataTypes.STRING,
    },
    sd_apikey: {
      type:DataTypes.STRING,
    },
    sd_address:  {
      type:DataTypes.STRING,
    },
    sd_data: {
      type:DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return device_value;
};

/*
  value는 데이터 값
  시리얼 번호 이거는 디바이스 이름
  apikey 보안을 위해서 사용
  address는 위치 
*/