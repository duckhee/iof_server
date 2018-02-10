'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('devices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            device_name: {
                type: Sequelize.STRING
            },
            device_apikey: {
                type: Sequelize.STRING,
                references: {
                    model: 'users',
                    key: 'apikey'
                },
                onDelete: 'CASCADE',
                allowNull: false,
            },
            device_num: {
                type: Sequelize.INTEGER,
                default: 0
            },
            device_serial: {
                type: Sequelize.STRING
            },
            device_address: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('devices');
    }
};