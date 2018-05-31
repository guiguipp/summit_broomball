var path = require("path");

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/games/", function(req, res) {
    db.Game.findAll({}).then(function(dbGame) {
      res.json(dbGame);
      });
    });

  app.get("/api/games/:id", function(req, res) {
    let id = parseInt(req.params.id); 
    db.Game.findById(id).then(function(dbGame) {
      res.json(dbGame);
      });  
    });
    
 
  app.post("/api/games", function(req, res) {
    db.Game.create({
      game_date: req.body.game_date, 
      })
      .then(function(dbGame) {
        res.json(dbGame);
        });
      });
  
  app.put("/api/games/:id", function(req, res) {
    db.Game.update({
      game_date: req.body.game_date, 
      goals_dark: req.body.goals_dark,
      goals_white: req.body.goals_white,
      summary: req.body.summary,
      author: req.body.author,
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbGame) {
        res.json(dbGame);
        });
      });
  
  app.delete("/api/games/:id", function(req, res) {
    db.Game.destroy({
      where: {id: req.params.id}
      })
      .then(function(dbGame) {
        res.json(dbGame);
        });
      });    
  }