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
            user_level:{
                type:Sequelize.INTEGER,
                allowNull:false
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
            user_zipcode:{
                type:Sequelize.STRING
            },
            user_email:{
                type:Sequelize.STRING,
                unique:true
            },
            apikey: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            user_status: {
                type: Sequelize.ENUM('active', 'inactive'),
                defaultValue: 'active'
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
        return queryInterface.dropTable('users');
    }
};