function prueba( req , res){
    console.log(req.body);
    res.status(200).json({'msg':'Te pones bien cachonda'})
}

module.exports = prueba;