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
            },
            sn_address: {
                type: Sequelize.STRING
            },
            sn_type: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('device_networks');
    }
};