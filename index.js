"use strict"
/**
 * Npm dependencies
 */
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var debug = require("debug")("app");
var mongoose = require("mongoose");

/**
 * Project modules
 */
var modules = require("./modules");

/**
 * General configs
 */
var app = express();
var port = process.env.PORT || 3000;

/**
 * Express configs
 */
app.use(bodyParser.json({
	inflate: true,
	type: "application/json"
}));

/**
 * DB connection
 */
mongoose.connect("mongodb://localhost/uqueue"); // TODO : add mongo string to config file
var db = mongoose.connection;
db.on("error", function(err){
	debug(err)
})
db.once("open", function(next){
	debug("Connection to Mongo successfull")
})

/**
* Mount router 
*/
app.use("/", modules);

http.createServer(app).listen(port, function(){
	debug("uQueue server up and listening on port " + port);
});
