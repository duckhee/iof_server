'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.STRING,
                unique: true
            },
            user_password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_name: {
                type: Sequelize.STRING
            },
            user_phone1: {
                type: Sequelize.INTEGER
            },
            user_phone2: {
                type: Sequelize.INTEGER
            },
            user_phone3: {
                type: Sequelize.INTEGER
            },
            user_address1: {
                type: Sequelize.STRING
            },
            user_address2: {
                type: Sequelize.STRING
            },
            apikey: {
                type: DataTypes.STRING,
                unique: true
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
        return queryInterface.dropTable('users');
    }
};