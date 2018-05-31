'use strict'

module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        shortname: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [1]
                }
            },
        full_name: {
            type: DataTypes.STRING,
            allowNull: true,
            },
        player_level: {
            type: DataTypes.STRING,
            allowNull: true
            },
        preferred_position: {
            type: DataTypes.ENUM,
            values: ['forward','defense','goalie'],
            allowNull: true,
            validate: {
                len: [1]
                }
            },
        player_status: {
            type: DataTypes.ENUM,
            values: ['member','ten_bucker'],
            allowNull: false
            },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true
                }
            }
        });
        return Player;
    };