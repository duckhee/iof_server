'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('tbl_boards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT
            },
            writer: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                onDelete: 'CASCADE',

            },
            viewcnt: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaults: 0
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
        return queryInterface.dropTable('tbl_boards');
    }
};