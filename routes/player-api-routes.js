var db = require("../models");

module.exports = function(app) {
  app.get("/api/players", function(req, res) {
    db.Player.findAll({}).then(function(dbPlayer) {
      res.json(dbPlayer);
      });
    });
  app.get("/api/players/:status", function(req, res) {
    let status = req.params.status;     
    db.Player.findAll({
      where: {player_status: status}
      }).then(function(dbPlayer) {
        res.json(dbPlayer);
        });
    });
  app.get("/api/players/player/:id", function(req, res) {
    let id = parseInt(req.params.id); 
    db.Player.findById(id).then(function(dbPlayer) {
      res.json(dbPlayer);
      });  
    });
  
  app.post("/api/players", function(req, res) {
    db.Player.create({
      shortname: req.body.shortname, 
      full_name: req.body.full_name,
      player_level: req.body.player_level,
      preferred_position: req.body.preferred_position,
      player_status: req.body.player_status,
      email: req.body.email
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
        });
      });
    
  app.put("/api/players/player/:id", function(req, res) {
    db.Player.update({
      shortname: req.body.shortname, 
      full_name: req.body.full_name,
      player_level: req.body.player_level,
      preferred_position: req.body.preferred_position,
      player_status: req.body.player_status,
      email: req.body.email
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
        });
      });

  app.delete("/api/players/:id", function(req, res) {
    db.Player.destroy({
      where: {id: req.params.id}
      })
      .then(function(dbPlayer) {
      res.json(dbPlayer);
      });
    });
};
