'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('tbl_replies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bno: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'tbl_boards',
                    key: 'title'
                },
                onDelete: 'CASCADE',
            },
            rwriter: {
                type: Sequelize.STRING,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                onDelete: 'CASCADE',
            },
            rcontent: {
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
        return queryInterface.dropTable('tbl_replies');
    }
};