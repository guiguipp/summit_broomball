var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });

  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });

  app.get("/league", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/league.html"));
  });

  app.get("/draft", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/draft.html"));
  });

  app.get("/player", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/player.html"));
  });

  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/stats.html"));
  });

  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/contact.html"));
  });

};

