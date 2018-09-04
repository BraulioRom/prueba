const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')

//configuraciones
require('./config/config');

//servidor
var server = express();

//logs 
server.use(morgan('common'));


//cors
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//rutas
var movilRoutes = require('./routes/movilRoutes');
var adminRoutes = require('./routes/adminRoutes');

//middlewares
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//clientes
server.use('/movil', movilRoutes);
server.use('/admin', adminRoutes);

//inicia server si conecta mongo
mongoose.connect(MONGO_URI, MONGO_OPTIONS).then(() => {
    console.log('Server: Mongo '+ MONGO_URI);
    console.log('Server: Mongo DB:' + MONGO_OPTIONS['dbName']);

    server.listen(PORT, () => {
        console.log('Server: Node Port: ' + PORT);
    });

}).catch(err => {
    console.log('Server: Mongo' + err);
});