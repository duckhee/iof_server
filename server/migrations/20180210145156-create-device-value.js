'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('device_values', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            deviceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'devices',
                    key: 'id'
                },
                onDelete: 'CASCADE',
            },
            sd_text: {
                type: Sequelize.TEXT
            },
            sd_serial: {
                type: Sequelize.STRING,
                allowNull:false,
            },
            sd_apikey: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            sd_address: {
                type: Sequelize.STRING
            },
            sd_data: {
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
        return queryInterface.dropTable('device_values');
    }
};