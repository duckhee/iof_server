'use strict';
module.exports = function(sequelize, DataTypes) {
    var tbl_board = sequelize.define('tbl_board', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
        },
        writer: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            },
            onDelete: 'CASCADE',
        },
        viewcnt: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                //tbl_board.belong(models.user); //check associate
                models.tbl_board.belongsToMany(models.user, {
                    foreginKeyConstraint: true,
                    foreignKey: 'user_id',
                    allowNull: false
                });
                models.tbl_board.hasMany(models.tbl_reply, {
                    foreginKeyConstraint: true,
                    foreginKey: 'tblBoardId',
                    onDelete: 'CASCADE',
                    allowNull: false
                });
            }
        }
    });


    tbl_board.associate = function(models) {
        tbl_board.hasMany(models.tbl_reply, {
            foreginKey: 'tblBoardId',
            onDelete: 'CASCADE',
            allowNull: false,
            foreginKeyConstraint: true
        });

        tbl_board.belongsTo(models.user, {
            foreginKeyConstraint: true,
            foreignKey: 'writer',
            allowNull: false
        });

    }

    tbl_board.hook('beforeCreate', function(tbl_board) {
        console.log('test hook', tbl_board);
    })
    return tbl_board;
};