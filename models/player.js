'use strict'

module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        shortname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                }
            },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                }
            },
        level: {
            type: DataTypes.STRING,
            allowNull: false
            },
        preferred_position: {
            type: DataTypes.ENUM,
            values: ['forward','defense','goalie'],
            allowNull: false,
            validate: {
                len: [1]
                }
            },
        status: {
            type: DataTypes.ENUM,
            values: ['member','ten_bucker'],
            allowNull: false
            },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1],
            validate: {
                isEmail: true
                }
            }
        });
        return Player;
    };