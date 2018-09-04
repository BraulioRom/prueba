var Usuario = require('../models/user')

//firebase
var admin = require('firebase-admin');
var serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

var toptenp = require('./toptenp');

async function mLogin( req , res){  
    registro = await Usuario.find({mail:req.body.email},'_id');
    
    if (registro.length == 0) { //no existe registro con ese correo entonces lo creo
        
        //creo documento en firebase
        var addDoc = await db.collection('usuarios').doc();
       
        //creo registro en mongo
        let user = { 
            name: req.body.nombre,
            mail: req.body.email,
            img: req.body.imagen || null,
            provider: req.body.provider,
            psw: req.body.contrasena || ':)',
            vector: req.body.vector,
            ref: addDoc.path
        };
        //creo topten personal
        ex= await toptenp(addDoc);
        //creo regitro en base
        Usuario.create(user, 
            function (err, small) {
                if (err){
                    //error creando registro
                    console.log(err);
                    return res.status(200).json({ok:false});
                } 
                else{
                    //usuario creado correctamente
                    return res.status(200).json({nombre: small.name, email: small.email, img: small.img, ok:true, urlfirebase: small.ref});
                }
          });
          
    } else {
        //si existe el registro busco datos
        Usuario.findOne({ '_id': registro }, 'name img ref', function (err, person) {
            if (err) return handleError(err);
            return res.status(200).json({nombre: person.name, email: small.email, img: person.img, ok:true, urlfirebase: person.ref});
          });
    }
      
}

module.exports = mLogin;