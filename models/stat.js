'use strict'

module.exports = function(sequelize, DataTypes) {
    var Stat = sequelize.define("Stat", {
        goal_scorer: {
            type: DataTypes.STRING
            },
        goal_assist: {
            type: DataTypes.STRING
            },
        team: {
            allowNull: false,
            type: DataTypes.ENUM,
            values: ['white','dark']
            }
        });
    Stat.associate = function(models) {
        // The Stat should belong to a Game
        // A Stat Cannot be created without a Game due to the foreign key constraint
        Stat.belongsTo(models.Game, {
            foreignKey: {
                allowNull: false
                }
            });
        };        
    return Stat;
    };