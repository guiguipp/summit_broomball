'use strict'

module.exports = function(sequelize, DataTypes) {
    var Roster = sequelize.define("Roster", {
        player: {
            type: DataTypes.STRING
            },
        goals: {
            type: DataTypes.INTEGER
            },
        assists: {
            type: DataTypes.INTEGER
            },
        points: {
            type: DataTypes.INTEGER
            },
        captain1Pick: {
            type: DataTypes.INTEGER
            },
        captain2Pick: {
            type: DataTypes.INTEGER
            },
        availability: {
            type: DataTypes.BOOLEAN
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