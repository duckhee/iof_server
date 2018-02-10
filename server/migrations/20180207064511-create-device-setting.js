'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('device_settings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            st_serial: {
                type: Sequelize.STRING
            },
            st_apikey: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            st_address: {
                type: Sequelize.STRING
            },
            st_title: {
                type: Sequelize.STRING
            },
            st_gps: {
                type: Sequelize.STRING
            },
            st_ping: {
                type: Sequelize.INTEGER
            },
            st_group: {
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
        return queryInterface.dropTable('device_settings');
    }
};