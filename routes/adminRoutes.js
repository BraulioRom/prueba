const express = require('express');

var server = express();

server.get('/topten', require('../middlewares/topten'));

module.exports = server;