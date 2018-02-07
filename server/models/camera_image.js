'use strict';
module.exports = function(sequelize, DataTypes) {
  var camera_image = sequelize.define('camera_image', {
    si_serial: DataTypes.STRING,
    si_path: DataTypes.STRING,
    si_filename: DataTypes.STRING,
    si_filesize: DataTypes.STRING
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      }
    }
  });
  return camera_image;
};