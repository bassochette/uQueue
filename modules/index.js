"use strict"
var router = require("express").Router();
var Queue = require("../models/queue.js")

router.get("/", function(req, res){
	
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

router.post("/", function(req, res){
	
	debug(req.body);
	
	var queue = new Queue({
		name : req.body.name
	});
	queue.save(function(err, queue){
		if(err) res.status(500).send(err);
		return res.status(200).send(queue);
	});
});

router.get("/:uuid", function(req, res){
	
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

router.post("/:uuid", function(req, res){

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

module.exports = router;
