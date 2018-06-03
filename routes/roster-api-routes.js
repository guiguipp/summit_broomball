var path = require("path");
var db = require("../models");
var Sequelize = require("sequelize");


module.exports = function(app) {
  app.get("/api/rosters", function(req, res) {
    db.Roster.findAll({}).then(function(dbRoster) {
      res.json(dbRoster);
      });
    });
  app.get("/api/rosters/:id", function(req, res) {
    let id = parseInt(req.params.id); 
    db.Roster.findById(id).then(function(dbRoster) {
      res.json(dbRoster);
      });  
    });
  // find all available players for a given game. Sorted alphabetically
  app.get("/api/rosters/game/:game_id", function(req, res) {
    db.Roster.findAll({
      where: 
        {GameId: req.params.game_id, availability: true}, 
        order: [
          ['player', 'ASC']]
    }).then(function(dbRoster) {
      res.json(dbRoster);
      });  
    });
  // find level info from "players" on a join of all available players for a given game. Sorted alphabetically
  app.get("/api/rosters/game/:game_id/players", function(req, res) {
    db.sequelize.query('SELECT DISTINCT shortname,Rosters.id,player_level AS level FROM rosters INNER JOIN players ON rosters.player = players.shortname WHERE GameId=? AND availability=true ORDER BY shortname ASC',
    {replacements: [req.params.game_id], type: db.sequelize.QueryTypes.SELECT
      }).then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
  // create a roster for a game
  app.post("/api/rosters", function(req, res) {
    db.Roster.create({
      player: req.body.player, 
      GameId: req.body.GameId,
      availability: req.body.availability,
      editable: true
      })
      .then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
  // edit player for a game
  app.put("/api/rosters/:id", function(req, res) {
    db.Roster.update({
      player: req.body.player, 
      goals: req.body.goals,
      assists: req.body.assists,
      availability: req.body.availability,
      captain1Pick: req.body.captain1Pick,
      captain2Pick: req.body.captain2Pick,
      team: req.body.team
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
  app.delete("/api/rosters/:id", function(req, res) {
    db.Roster.destroy({
      where: {id: req.params.id}
      })
      .then(function(dbRoster) {
      res.json(dbRoster);
      });
    });

  };