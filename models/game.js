module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                len: [1]
                }
            },
        goals_team1: {
            type: DataTypes.INTEGER(2),
            },
        goals_team2: {
            type: DataTypes.INTEGER(2),
            },
        summary: {
            type: DataTypes.TEXT
            }
        });
        return Game;
    };