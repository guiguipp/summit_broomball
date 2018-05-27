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
                len: [1]
                }
            },
        level: {
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                is: /^[a-z]+$/i,
                } 
            },
        preferred_position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                }
            },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['member', 'ten_bucker']],
                }
            },
        preferred_position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                }
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