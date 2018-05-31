var path = require("path")
var db = require("../models");

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

  app.post("/api/rosters", function(req, res) {
    db.Roster.create({
      player: req.body.player, 
      GameId: req.body.GameId,
      })
      .then(function(dbRoster) {
        res.json(dbRoster);
        });
      });      
  app.put("/api/rosters/:id", function(req, res) {
    db.Roster.update({
      player: req.body.player, 
      goals: req.body.goals,
      assists: req.body.assists,
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