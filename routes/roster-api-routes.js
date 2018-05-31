var path = require("path")
var db = require("../models");

module.exports = function(app) {
  app.get("/api/Rosters", function(req, res) {
      console.log("get all method is working")

    
});

app.get("/api/Rosters/:id", function(req, res) {
    console.log("get id method is working")
    
});

  app.put("/api/Rosters/:id", function(req, res) {
    console.log("get put method is working")
    
  });

  app.post("/api/Rosters", function(req, res) {
    console.log("get post method is working")
  });

  app.delete("/api/Rosters/:id", function(req, res) {
    console.log("get delete method is working")
    
  });

};