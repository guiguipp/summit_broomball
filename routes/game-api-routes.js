var path = require("path");

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/game/", function(req, res) {

      console.log("this is a test of get request all")
  });

//   // Get route for returning posts of a specific category
  app.get("/api/game/:id", function(req, res) {

    console.log("this is a test of get request by id")
      });
    
 
  app.post("/api/Game", function(req, res) {
    console.log("this is a test of post");
 
  })
  app.put("/api/game/:id", function(req, res) {
    console.log("get put method is working")
    
  });
  app.delete("/api/game/:id", function(req, res) {
    console.log("get delete method working")
  })
}