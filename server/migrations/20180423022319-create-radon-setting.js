'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('radon_settings', {
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
      sr_serial: {
        type: Sequelize.STRING,
        onDelete:'CASCADE',
        allowNull:false,
        references:{
          model:'devices',
          key:"device_serial"
        }
      },
      sr_address: {
        type: Sequelize.STRING
      },
      sensing_time: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('radon_settings');
  }
};