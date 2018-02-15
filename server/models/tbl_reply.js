'use strict';
module.exports = function(sequelize, DataTypes) {
    var tbl_reply = sequelize.define('tbl_reply', {
        bno: {
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
            type:DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                tbl_reply.belongMany(models.user, {
                    foreignKeyConstraint: true,
                    foreignKey: 'user_id',
                    allowNull: false
                });
                tbl_reply.belongMany(models.tbl_board, {
                    foreignKeyConstraint: true,
                    foreignKey: 'id',
                    allowNull: false
                });
            }
        }
    });
    return tbl_reply;
};