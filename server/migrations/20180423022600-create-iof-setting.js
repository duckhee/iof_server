'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('iof_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        allowNull:false,
        references:{
          model:'devices',
          key:'id'
        }
      },
      sd_serial: {
        type: Sequelize.STRING,
        onDelete:'CASCADE',
        allowNull:false,
        references:{
          model:'devices',
          key:'device_serial'
        }
      },
      sd_address: {
        type: Sequelize.STRING
      },
      water_time: {
        type: Sequelize.INTEGER,
        defaultValeu:5
      },
      camera_time: {
        type: Sequelize.INTEGER,
        defaultValeu:30
      },
      sensing_time: {
        type: Sequelize.INTEGER,
        defaultValeu:1
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('iof_settings');
  }
};