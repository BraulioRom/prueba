 const express = require('express');

 var server = express();
 
 //historial
 server.post('/history', require('../middlewares/history'));

 //itinerario
 server.post('/itinerario', require('../middlewares/itinerario'));
 
 //vector
 server.post('/settings', require('../middlewares/settings'));
 
 //login and sign up
 server.post('/login', require('../middlewares/mLogin'));
 
 //te pones bien cachonda
 server.get('/', require('../middlewares/prueba'));

 module.exports = server;