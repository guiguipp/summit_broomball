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
        pick1set: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
            },
        pick2set: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
            },
        lock_info: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
            },
        author: {
            type: DataTypes.STRING
            }
        });
        Game.associate = function(models) {
            // Associating Game with Roster
            // When a game is deleted, should also delete any associated Roster
            Game.hasMany(models.Roster, {
              onDelete: "cascade"
            });
          };
        
        return Game;
    };