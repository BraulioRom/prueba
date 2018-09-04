 const express = require('express');

 var server = express();
 server.post('/itinerario', require('../middlewares/itinerario'));
 server.post('/settings', require('../middlewares/settings'));
 server.post('/login', require('../middlewares/mLogin'));
 server.get('/', require('../middlewares/prueba'));

 module.exports = server;