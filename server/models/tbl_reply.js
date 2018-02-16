'use strict';
module.exports = function(sequelize, DataTypes) {
    var tbl_reply = sequelize.define('tbl_reply', {
        tblBoardId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tbl_board',
                key: 'id'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        rwriter: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'user_id'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        rcontent: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.tbl_reply.belongsTo(models.user, {
                    foreignKeyConstraint: true,
                    foreignKey: 'rwriter',
                    allowNull: false
                });
                models.tbl_reply.belongsTo(models.tbl_board, {
                    foreignKeyConstraint: true,
                    foreignKey: 'id',
                    allowNull: false
                });

            }
        }
    });

    tbl_reply.associate = function(models) {
        tbl_reply.belongsTo(models.tbl_board, {
            foreignKey: 'id',
            foreignKeyConstraint: true,
            allowNull: false
        });
        tbl_reply.belongsTo(models.user, {
            foreignKeyConstraint: true,
            foreignKey: 'rwriter',
            allowNull: false
        });
    }

    return tbl_reply;
};