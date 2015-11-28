"use strict"
var mongoose = require("mongoose");

var queueSchema = mongoose.Schema({
	name : String,
	items : [mongoose.Schema.Types.Mixed] 
});
var Queue = mongoose.model("Queue", queueSchema);

module.exports = Queue;
