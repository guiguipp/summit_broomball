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
  app.get("/api/rosters/game/:game_id/availability/:availability/:sortingcol/:direction", function(req, res) {
    db.Roster.findAll({
      where: 
        {GameId: req.params.game_id, availability: req.params.availability}, 
        order: [
          [req.params.sortingcol, req.params.direction]]
    }).then(function(dbRoster) {
      res.json(dbRoster);
      });  
    });
  // find level info from "players" on a join of all available players for a given game. Sorted alphabetically
  app.get("/api/rosters/game/:game_id/players", function(req, res) {
    db.sequelize.query('SELECT DISTINCT shortname,Rosters.id, Rosters.captain1Pick, Rosters.captain2Pick, player_level AS level FROM rosters INNER JOIN players ON rosters.player = players.shortname WHERE GameId=? AND availability=true ORDER BY shortname ASC',
    {replacements: [req.params.game_id], type: db.sequelize.QueryTypes.SELECT
      }).then(function(dbRoster) {
        res.json(dbRoster);
        });
      });

  // find the picks by captain1 in a given game
  app.get("/api/rosters/:game_id/players/captain1picks", function(req, res) {
    db.sequelize.query('SELECT id, player, captain1Pick, captain2Pick FROM rosters WHERE GameId=? AND availability=true ORDER BY captain1Pick ASC;',
    {replacements: [req.params.game_id], type: db.sequelize.QueryTypes.SELECT
      }).then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
  // find the picks by captain2 in a given game
  app.get("/api/rosters/:game_id/players/captain2picks", function(req, res) {
    db.sequelize.query('SELECT id, player, captain1Pick, captain2Pick FROM rosters WHERE GameId=? AND availability=true ORDER BY captain2Pick ASC;',
    {replacements: [req.params.game_id], type: db.sequelize.QueryTypes.SELECT
      }).then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
// function to get the dark score updated
app.get("/api/rosters/:game_id/score/dark", function(req, res) {
  db.sequelize.query('SELECT sum(goals) AS goals FROM rosters WHERE GameId=? and team="dark";',
  {replacements: [req.params.game_id], type: db.sequelize.QueryTypes.SELECT
    }).then(function(dbRoster) {
      res.json(dbRoster);
      });
    });
// function to get the white score updated
app.get("/api/rosters/:game_id/score/white", function(req, res) {
  db.sequelize.query('SELECT sum(goals) AS goals FROM rosters WHERE GameId=? and team="white";',
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
  app.put("/api/rosters/:id/", function(req, res) {
    db.Roster.update({
      player: req.body.player, 
      goals: req.body.goals,
      assists: req.body.assists,
      availability: req.body.availability,
      // captain1Pick: req.body.captain1Pick,
      // captain2Pick: req.body.captain2Pick,
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
  app.put("/api/rosters/:id/reset", function(req, res) {
    db.Roster.update({
      captain1Pick: 0,
      captain2Pick: 0,
      team: "unavailable"
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
  app.put("/api/rosters/:id/goals", function(req, res) {
    db.Roster.update({
      // player: req.body.player, 
      goals: req.body.goals
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
  app.put("/api/rosters/:id/assists", function(req, res) {
    db.Roster.update({
      // player: req.body.player, 
      assists: req.body.assists
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
  app.put("/api/rosters/:id/:rank/captain1picks", function(req, res) {
    db.Roster.update({
      // player: req.body.player, 
      captain1Pick: req.params.rank
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbRoster) {
        res.json(dbRoster);
        });
      });
    app.put("/api/rosters/:id/:rank/captain2picks", function(req, res) {
      db.Roster.update({
        // player: req.body.player, 
        captain2Pick: req.params.rank
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