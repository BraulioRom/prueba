var Lugares = require('../models/place')

async function itinerario(req, res) {
    let lugares;
    horaFin = JSON.parse(req.body.horaFin);
    horaInicio = JSON.parse(req.body.horaInicio);
    usuario = req.body.correo;
    tipo = req.body.salida;
    dia = req.body.dia; 

    try {
        cafes = await Lugares.find().or([{
            "properties.cuisines": "cafe"
        }, {
            "properties.food": "Desayuno"
        }])
        restaurante = await Lugares.find().nor([{
            "properties.cuisines": "bar"
        }, {
            "properties.cuisines": "pub"
        }])
        bar = await Lugares.find().or([{
            "properties.cuisines": "Bar"
        }, {
            "properties.cuisines": "Pub"
        }])

        //reglas
        var desayuno = {
            hora: 7,
            minuto: 40,
            duracion: 80
        }
        var comida = {
            hora: 15,
            minuto: 20,
            duracion: 100
        }
        var cafe = {
            horam: 9,
            minutom: 20,
            horat: 16,
            minutot: 20,
            duracion: 40
        }

        console.log(cafes.length);
        
        usuario = 700 //tiempo(horaInicio.hora,horaInicio.minuto,0)[0]
        
        breakfast = [desayuno.hora * 100].concat(tiempo(desayuno.hora, desayuno.minuto, desayuno.duracion))
        lunch = [comida.hora * 100].concat(tiempo(comida.hora, comida.minuto, comida.duracion))
        coffee = [cafe.horam * 100].concat(tiempo(cafe.horam, cafe.minutom, cafe.duracion)).concat(cafe.horat * 100).concat(tiempo(cafe.horat, cafe.minutot, cafe.duracion));

        if (usuario <= breakfast[1]) {
            //desayuno cafe museo comida cafe bares
            lugares=place('b');
            lugares=lugares.concat(place('c'));
            lugares=lugares.concat(place('l'));
            lugares=lugares.concat(place('c'));
            lugares=lugares.concat(place('bar'));
            console.log('1');
            console.log(lugares);
        } else
        if (breakfast[2] <= usuario && usuario <= coffee[1]) {
            //cafe museo comida cafe bares
            lugares=place('c');
            lugares=lugares.concat(place('l'));
            lugares=lugares.concat(place('c'));
            lugares=lugares.concat(place('bar'));
            console.log(lugares);
            console.log('2');
        } else
        if (coffee[1] <= usuario && usuario <= lunch[0]) {
            // museo comida cafe bares
            lugares=place('l');
            lugares=lugares.concat(place('c'));
            lugares=lugares.concat(place('bar'));
            //console.log(lugares);
            console.log('3');
        } else
        if (lunch[0] <= usuario && usuario <= lunch[1]) {
            //comida cafe bares
            lugares=place('l');
            lugares=lugares.concat(place('c'));
            lugares=lugares.concat(place('bar'));
            //console.log(lugares);
            console.log('4');
        } else
        if (lunch[2] <= usuario && usuario <= coffee[4]) {
            //cafe bares
            lugares=place('c');
            lugares=lugares.concat(place('bar'));
            //console.log(lugares);
            console.log('5');
        } else {
            //3 bares
            lugares=place('bar');
            //console.log(lugares);
            console.log('6');
        }
        
        
        res.status(200).json(lugares)
        //res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

function place(tipo) { 
    let lugar;
    let salida = []
    switch (tipo) {
        case 'b':
            let a = Math.floor(Math.random() * Math.floor(restaurante.length));
            lugar = {
                id: restaurante[a]._id,
                nombre: restaurante[a].name,
                imagenes: restaurante[a].img,
                ubicacion: restaurante[a]['location']
            }
            salida.push(lugar)
            break;
        case 'c':            
            let b = Math.floor(Math.random() * Math.floor(cafes.length));
            lugar = {
                id: cafes[b]._id,
                nombre: cafes[b].name,
                imagenes: cafes[b].img,
                ubicacion: cafes[b]['location']
            }           
            salida.push(lugar)
            break;
        case 'l':
            let c = Math.floor(Math.random() * Math.floor(restaurante.length));
            lugar = {
                id: restaurante[c]._id,
                nombre: restaurante[c].name,
                imagenes: restaurante[c].img,
                ubicacion: restaurante[c]['location']
            }
            salida.push(lugar)
            break;
        default:
            let d
            for (let index = 0; index < 3 ; index++) {
                d = Math.floor(Math.random() * Math.floor(bar.length));
                lugar = {
                    id: bar[d]._id,
                    nombre: bar[d].name,
                    imagenes: bar[d].img,
                    ubicacion: bar[d]['location']
                }
                salida.push(lugar)
            }
            break;
    }
    return salida
}


function tiempo(h, m, d) {
    let inicio, fin;
    let hora, minuto;
    if (m >= 60) {
        let hm = Math.floor(m / 60);
        let mm = m % 60;
        inicio = (h + hm) * 100 + mm;
    } else {
        inicio = h * 100 + m;
    }

    if (d != 0) {
        fin = tiempo(Math.floor(inicio / 100), inicio % 100 + d, 0)
        arreglo = [inicio, fin[0]];
    } else {
        arreglo = [inicio, 0]
    }
    return arreglo

}
module.exports = itinerario;