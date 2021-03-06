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
            sn_serial: {
                type: Sequelize.STRING
            },
            sn_apikey: {
                type: Sequelize.STRING,
                references: {
                    model: 'users',
                    key: 'apikey'
                },
                onDelete: 'CASCADE',
                allowNull: false,
            },
            sn_address: {
                type: Sequelize.STRING
            },
            sn_type: {
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
        return queryInterface.dropTable('device_networks');
    }
};