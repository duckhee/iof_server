'use strict';
module.exports = function(sequelize, DataTypes) {
  var device_value = sequelize.define('device_value', {
    sd_serial: DataTypes.STRING,
    sd_address: DataTypes.STRING,
    sd_data: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return device_value;
};