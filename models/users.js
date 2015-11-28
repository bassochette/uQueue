"use strict" 
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	publicKey: String,
	privateKey: String,
	email : String,
	firstName : String,
	lastName : String
});

var User = mongoose.model("User", userSchema);
module.exports = User;
