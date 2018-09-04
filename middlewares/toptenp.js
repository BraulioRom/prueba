var Lugares = require('../models/place')
let admin = require('firebase-admin');

var db = admin.firestore();

async function toptenp( referencia){
    p1= await Lugares.find({numero: {$gt:50}}).limit(5).sort({ranking: -1}).select('-_id name ranking img properties.schedule properties.description');
    p2= await Lugares.find().sort({numero:-1, ranking:1}).limit(5).select('-_id name ranking img properties.schedule properties.description');
    
    total = p1.concat(p2);
    total.forEach(element => {
        referencia.collection('topten').add(JSON.parse(JSON.stringify(element)))
    });   
}

module.exports = toptenp;