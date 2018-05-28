'use strict'

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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