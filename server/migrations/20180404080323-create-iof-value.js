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
                type: Sequelize.STRING,
                onDelete: 'CASCADE',
                allowNull: false,
                references: {
                    model: 'devices',
                    key: "device_serial"
                }
            },
            id_address: {
                type: Sequelize.STRING
            },
            id_text: {
                type: Sequelize.TEXT
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