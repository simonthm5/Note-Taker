/// use dirname with node

let notesDB = require("../db/db.json");
const fs = require("fs");
var path = require("path");
var dirPath = path.join(__dirname, "../db/db.json");

module.exports = function (app) {

  app.post("/api/notes", function (req, res) {
    var noteInput = req.body;
    notesDB.push(noteInput);
    var newEntry = notesDB.map(v=>Object.assign(v, { id: notesDB.indexOf(v)}));
    var entryJSON = JSON.stringify(newEntry);
    fs.writeFileSync(dirPath, entryJSON, function(err) {
        if(err) throw err;
    });
    res.json(true);
});


app.delete("/api/notes/:id", function(req, res){
  let foundID = parseInt(req.params.id);
  fs.readFile(dirPath, function(err, data){
    if (err) throw err;
    for(var i=0; i<notesDB.length; i++){
      if(foundID === notesDB[i].id){
        // actually deletes the post:
      notesDB.splice(i,1);
        var newEntry = JSON.stringify(notesDB); 
        fs.writeFileSync(dirPath, newEntry, function(err){
          if(err) throw err;
        });
      }
    }
  });
  res.json(true); 
});

    app.get("/api/notes", function(req, res) {
        fs.readFile(dirPath, function(err, data) {
            if(err) throw err;
            res.json(notesDB);
        });
        });







}
