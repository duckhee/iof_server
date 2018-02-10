'use strict';
module.exports = function(sequelize, DataTypes) {
  var device = sequelize.define('device', {
    device_name: DataTypes.STRING,
    device_apikey: DataTypes.STRING,
    device_num: DataTypes.INTEGER,
    device_serial: DataTypes.STRING,
    device_address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return device;
};