CREATE DATABASE summit; 

USE summit;

CREATE TABLE player_table(
    ID int NOT NULL AUTO_INCREMENT,
    short_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    player_level VARCHAR(255) NOT NULL,
    preferred_position VARCHAR(255) NOT NULL,
    player_status VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL
    updated_at DATE NOT NULL
    PRIMARY KEY(ID)
);

CREATE TABLE game_table(
    ID int NOT NULL AUTO_INCREMENT,,
    game_date DATETIME NOT NULL,
    goals_dark VARCHAR(255) NOT NULL,
    goals_white VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);

CREATE TABLE stats_table(
    ID int NOT NULL AUTO_INCREMENT,
    game_id INT NOT NULL,
    goal_scorer VARCHAR(255) NOT NULL,
    goal_assist VARCHAR(255) NOT NULL,
    team int NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);

CREATE TABLE roster_table (
    ID int NOT NULL AUTO_INCREMENT,
    game_id int NOT NULL,
    player VARCHAR(255) NOT NULL,
    goals int NOT NULL,
    assists INT NOT NULL,
    points INT NOT NULL,
    captain_1 VARCHAR(255) NOT NULL,
    captain_2 VARCHAR(255) NOT NULL,
    availabilty int NOT NULL,
    team VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);