'use strict';
module.exports = function(sequelize, DataTypes) {
    var tbl_board = sequelize.define('tbl_board', {
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
            default: 0
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                //tbl_board.belong(models.user); //check associate
                tbl_board.belongToMany(models.user,{
                    foreginKeyConstraint:true, 
                    foreignKey:'user_id',
                    allowNull:false
                });
                tbl_board.hasMany(models.tbl_reply);
            }
        }
    });
    tbl_board.hook('beforeCreate', function(tbl_board) {
        console.log('test hook', tbl_board);
    })
    return tbl_board;
};