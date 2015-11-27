"use strict"
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var debug = require("debug")("app");
var mongoose = require("mongoose");

//General Configs
var app = express();
var port = process.env.PORT || 3000;

// Configure Express app
app.use(bodyParser.json({
	inflate: true,
	type: "application/json"
}));

//connect to DB
mongoose.connect("mongodb://localhost/uqueue"); // TODO : add mongo string to config file
var db = mongoose.connection;
db.on("error", function(err){
	debug(err)
})
db.once("open", function(next){
	debug("Connection to Mongo successfull")
})

/**
* Models
*/
var queueSchema = mongoose.Schema({
	name : String,
	items : [mongoose.Schema.Types.Mixed] 
});
var Queue = mongoose.model("Queue", queueSchema);

/**z
* A bit of routing
*/
app.get("/", function(req, res){
	
	Queue.find({})
	     .exec(
	     	function(err, queues){
			if(err){
				res.status(500);
				return res.send(err);
			}
			res.status(200);
			res.send(queues);
				
		}
	     )

});

app.post("/", function(req, res){
	
	debug(req.body);
	
	var queue = new Queue({
		name : req.body.name
	});
	queue.save(function(err, queue){
		if(err) res.status(500).send(err);
		return res.status(200).send(queue);
	});
});

app.get("/:uuid", function(req, res){
	
	Queue.findOne({ _id : req.params.uuid})
		.exec( 
		function(err, queue){
			if(err) return res.status(500).send(err);
			if(!queue) return res.status(404).send("No queue");
			debug(queue);
			var item = queue.items.pop();
			res.status(200).send(item);
			queue.save(function(err, q){
				if(err) debug(err);
			});
		});

});

app.post("/:uuid", function(req, res){

	// add an item
	Queue.findOne({_id : req. params.uuid})
		.exec(
			function(err, queue){
				if(err) res.status(500).send(err);
				debug(queue);
				queue.items.push(req.body.item);
				queue.save(function(err, queue){
					if(err) return res.status(500).send(err);	
					return res.status(200).send(queue);
				});
			}
		);
});


http.createServer(app).listen(port);
