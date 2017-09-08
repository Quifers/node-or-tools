var fs = require("fs");
var routing = require('./vrp.js');
var payload = fs.readFileSync("inputfiles/3June.json");
var jsonData = JSON.parse(payload);
routing.execute(jsonData);