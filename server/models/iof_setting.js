'use strict';
module.exports = function(sequelize, DataTypes) {
  var iof_setting = sequelize.define('iof_setting', {
    deviceId: {
      type:DataTypes.INTEGER,
      references:{
        model:'device',
        key:'id'
      }
    },
    sd_serial: {
      type:DataTypes.STRING,
      references: {
        model: 'device',
        key: 'device_serial'
      },
      allowNull: false,
      onDelete: 'CASCADE',
    },
    sd_address: {
      type:DataTypes.STRING,
    },
    water_time: {
      type:DataTypes.INTEGER,
    },
    camera_time: {
      type:DataTypes.INTEGER,
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
  return iof_setting;
};