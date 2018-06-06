'use strict'

module.exports = function(sequelize, DataTypes) {
    // should the name of the player be a foreign key from players?
    // or won't it matter because of javascript validation?
    var Roster = sequelize.define("Roster", {
        player: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                }
            },
        goals: {
            type: DataTypes.INTEGER,
            defaultValue: 0
            },
        assists: {
            type: DataTypes.INTEGER,
            defaultValue: 0
            },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
            },
        captain1Pick: {
            type: DataTypes.INTEGER,
            defaultValue: 0
            },
        captain2Pick: {
            type: DataTypes.INTEGER,
            defaultValue: 0
            },
        availability: {
            type: DataTypes.BOOLEAN
            },
        lock_info: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
            },
        team: {
            type: DataTypes.ENUM,
            values: ['white','dark','unavailable'],
            }
        });
        Roster.associate = function(models) {
            // The Stat should belong to a Game
            // A Stat Cannot be created without a Game due to the foreign key constraint
            Roster.belongsTo(models.Game, {
                foreignKey: {
                allowNull: false
                }
            });
            };
        return Roster;
    };