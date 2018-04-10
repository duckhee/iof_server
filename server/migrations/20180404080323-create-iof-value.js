'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('iof_values', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_value: {
                type: Sequelize.STRING
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
            id_data: {
                type: Sequelize.TEXT
            },
            id_serial: {
                type: Sequelize.STRING
            },
            id_address: {
                type: Sequelize.STRING
            },
            id_text: {
                type: Sequelize.TEXT
            },
            id_apikey: {
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
        return queryInterface.dropTable('iof_values');
    }
};