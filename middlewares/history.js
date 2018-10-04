function prueba( req , res){
    console.log(req.body);
    res.sendStatus(200);
}

module.exports = prueba;