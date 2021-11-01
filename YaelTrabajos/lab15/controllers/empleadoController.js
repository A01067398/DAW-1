const Empleado = require('../models/empleado');

const fs = require('fs');

const archivo = 'empleados.txt';

exports.index = (request, response, next) => {
    response.render("index", {titulo: "LAB 15"});
};

exports.list = (request, response, next) => {
    const empleados = Empleado.fetchAll();
    response.render("list", {empleados: empleados});
};

exports.create = (request, response, next) => {
    response.render("create");
};

exports.get_all = (request, response, next) => {
    const json = {};
    json.empleados = [];

    const file =fs.readFileSync(archivo, 'utf-8');
    const lineas = file.split('\n');
    lineas.forEach(element => {        
        if(element != ""){
            let objeto = element.split(',');
            json.empleados.push({"codigo":  objeto[0], "nombres": objeto[1], "apellidos": objeto[2] });            
        }
    });    
    
    response.setHeader('Content-type', 'text/json');
    response.send({"response": "success", "data": json});
};

exports.save = (request, response, next) => {
    const codigo = request.body.codigo;
    const nombres = request.body.nombres;
    const apellidos = request.body.apellidos;

    const empleado = new Empleado(codigo, nombres, apellidos);
    empleado.save();
/*
    if(fs.existsSync(archivo)){
        fs.appendFile(archivo, codigo + "," + nombres + "," + apellidos + "\n", (err) =>{
            if(err) throw('No se pudo escribir el archivo');
            console.log('Empleado agregado');
        });
    }else{
        fs.writeFile(archivo, codigo + "," + nombres + "," + apellidos + "\n", (err) =>{
            if(err) throw('No se pudo agregar al archivo');
            console.log('Empleado agregado');
        });
    }*/

    response.render("index", {titulo: 'Empleado registrado'});
};

exports.error404 = (request, response, next) => {
    response.status(404).render("404"); 
}

