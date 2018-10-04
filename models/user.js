const mongoose = require('mongoose');

var user = mongoose.Schema({
    name: { type: String, lowercase: true },
    mail: { type: String, required: true},
    flag: { type: String},
    provider: { type: String},
    psw: {type: String},
    vector: {type: String},
    ref: {type: String, required: true}  
});

module.exports = mongoose.model('Usuarios', user);