"use strict"
var debug = require("debug")("jwtGuard");
var jwt = require("jsonwebtokens");
var User = require("../models/user.js");

var jwtGuard = function (req, res, next){

	let token = req.headers["uqueue-authorization"] || req.params.token;

	let payload = req.params.jwt || req.body;

	User.findOne({ publicKey: token})
		.exec(function(err, user){
				if(err){
				debug(err);
				return res.status(500).send(err);
				} 

				if(!user) return res.status(403).send("unauthorized");

				jwt.verify(payload, user.privateKey, function(err, decoded){
					if(err) return res.status(403).send("unauthorized");
					req.payload = decoded;
					next();
					}
					)
				});

};


module.exports = jwtGuard;
