var path = require("path")
var db = require("../models");

module.exports = function(app) {
  app.get("/api/rosters", function(req, res) {
    db.Rosters.findAll({}).then(function(dbRosters) {
    console.log("dbRosters");

      // res.json(dbStat);
      });
    });

    app.get("/api/stats", function(req, res) {
      db.Stat.findAll({}).then(function(dbStat) {
      console.log(dbStat);
      
        res.json(dbStat);
        });
      });

  app.get("/api/stats/:id", function(req, res) {
    db.Stat.findAll({
      where: {GameId: req.params.id}
    }).then(function(dbStat) {
      res.json(dbStat);
      });  
    });

  app.post("/api/stats/:id/goal", function(req, res) {
    db.Stat.create({
      team: req.body.team,
      goal_scorer: req.body.goal_scorer,
      GameId: req.body.GameId
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
        });
      });
    
  app.put("/api/stats/:id", function(req, res) {
    db.Stat.update({
      team: req.body.team, 
      goal_scorer: req.body.goal_scorer,
      goal_assist: req.body.goal_assist,
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
        });
      });


  app.delete("/api/stats/:id", function(req, res) {
    db.Stat.destroy({
      where: {id: req.params.id}
      })
      .then(function(dbStat) {
      res.json(dbStat);
      });
    });

};