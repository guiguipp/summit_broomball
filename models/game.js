'use strict'

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        game_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
                }
            },
        goals_dark: {
            type: DataTypes.INTEGER(2),
            },
        goals_white: {
            type: DataTypes.INTEGER(2),
            },
        summary: {
            type: DataTypes.TEXT
            },
        author: {
            type: DataTypes.STRING
            }
        });
        return Game;
    };