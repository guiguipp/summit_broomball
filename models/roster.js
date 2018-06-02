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
        editable: {
            type: DataTypes.BOOLEAN,
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