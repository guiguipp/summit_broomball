module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
    name: {
        name: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
    }
    });
    return Player;
    };
