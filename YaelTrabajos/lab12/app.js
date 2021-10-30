const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const archivo = 'empleados.txt';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

app.get('', (request, response) => {
    response.setHeader('Content-type', 'text/html');
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/list', (request, response) => {
    response.setHeader('Content-type', 'text/html');
    response.sendFile(__dirname + '/public/list.html');
});

app.get('/create', (request, response) => {
    response.setHeader('Content-type', 'text/html');
    response.sendFile(__dirname + '/public/create.html');
});

app.get('/get-all', (request, response) => {    
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
});

app.post('/save', (request, response) => {

    const codigo = request.body.codigo;
    const nombres = request.body.nombres;
    const apellidos = request.body.apellidos;

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
    }

    response.setHeader('Content-type', 'text/html');
    response.sendFile(__dirname + '/public/index.html');
});


app.use(function(req, res, next) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 ERROR');
});

app.listen(3000);