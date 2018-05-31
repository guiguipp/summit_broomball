var db = require("../models");

module.exports = function(app) {
  app.get("/api/players", function(req, res) {
      console.log("get all method is working")

    
});

app.get("/api/players/:id", function(req, res) {
    console.log("get id method is working")
    
});

  app.put("/api/players/:id", function(req, res) {
    console.log("get put method is working")
    
  });

  app.post("/api/players", function(req, res) {
    console.log("get post method is working")
  });

  app.delete("/api/players/:id", function(req, res) {
    console.log("get delete method is working")
    
  });

};
