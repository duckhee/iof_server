'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('device_networks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sn_apikey: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'apikey'
                },
                onDelete: 'CASCADE',

            },
            sn_serial: {
                type: Sequelize.STRING,
                onDelete: 'CASCADE',
                allowNull: false,
                references: {
                    model: 'devices',
                    key: 'device_serial'
                },
            },
            deviceId :{
                type:Sequelize.INTEGER,
                references:{
                    model:'devices',
                    key:'id'
                },
                allowNull:false,
                onDelete:'CASCADE'
            },
            sn_address: {
                type: Sequelize.STRING
            },
            sn_type: {
                type: Sequelize.STRING
            },
            sn_status: {
                type: Sequelize.ENUM('active', 'inactive'),
                defaultValue: 'inactive'
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
        return queryInterface.dropTable('device_networks');
    }
};