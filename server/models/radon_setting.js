'use strict';
module.exports = function(sequelize, DataTypes) {
  var radon_setting = sequelize.define('radon_setting', {
    deviceId: {
      type:DataTypes.INTEGER,
    },
    sr_serial: {
      type:DataTypes.STRING,
    },
    sr_address: {
      type:DataTypes.STRING,
    },
    sensing_time: {
      type:DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return radon_setting;
};