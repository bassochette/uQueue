"use strict"
var debug = require("debug")("modulesLoader");
var router = require("express").Router();

var queues = require("./queues.js");

router.use("/", queues);

module.exports = router;
