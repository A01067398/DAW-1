const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const archivo = 'empleados.txt';
const path_view = __dirname + "/public/views/";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use(express.static(path.join(__dirname, 'public/')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('', (request, response) => {
    response.render("index", {titulo: "LAB 14"});
});

app.get('/list', (request, response) => {
    response.render("list");
});

app.get('/create', (request, response) => {
    response.render("create");
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

    response.render("index", {titulo: 'Empleado registrado'});
});


app.use(function(req, res, next) {
    res.status(404).render("404");
});

app.listen(3000);
