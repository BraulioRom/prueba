const admin = require('firebase-admin');

var serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

var db = admin.firestore();

class fUsuarios{
    async existe(mail){
        return
    }
    obtenerReferencia(){

    }

}

class fLugares{
    topten(arreglo){

    }
}
module.exports = {fUsuarios, fLugares};