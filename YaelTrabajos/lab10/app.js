const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const archivo = "empleados.txt";

http.createServer((req, res) =>{

    console.log(`${req.method} solicita ${req.url}`);

    if(req.method == 'GET'){
        if(req.url == '/'){
            fs.readFile('./public/index.html', 'UTF-8', (err, html) =>{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });
        }else if(req.url == '/create'){
            fs.readFile('./public/create.html', 'UTF-8', (err, html) =>{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });
        }else if(req.url == '/list'){

            let contenido = ``;
            const json = {};
            json.empleados = [];
        
            const file =fs.readFileSync(archivo, 'utf-8');
            const lineas = file.split('\n');
            lineas.forEach(element => {        
                if(element != ""){
                    let objeto = element.split(',');
                    contenido += `
                    <tr>
                        <td>${objeto[0]}</td>
                        <td>${objeto[1]}</td>
                        <td>${objeto[2]}</td>
                    </tr>`          
                }
            });

            let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
                <title>Document</title>
                
            </head>
            <body>
                <div class="container">
                    <br>
                    <br>
                    <a class="btn btn-danger" href="/">Volver</a>
                    <br><br>
                    <div id="todos">
                    <table class="table">
                        <thead>
                            <th>Código</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                        </thead>
                        <tbody>
                            ${contenido}
                        </tbody>
                    </table>
                    </div>
                </div>
            </body>
            </html>
            `
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }else{
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 ERROR');
        }
    }else if(req.method == 'POST'){
        if(req.url == '/save'){

            let body = '';

            req.on('data', chunk =>{
                body += chunk;
            });
            req.on('end', () =>{
                data = body.split('&');
                let registro = '';
                data.forEach(param => {
                    row = param.split('=');
                    registro += row[1] + ',';
                });
                if(fs.existsSync(archivo)){
                    fs.appendFile(archivo, registro.substr(0, registro.length - 1) + "\n", (err) =>{
                        if(err) throw('No se pudo escribir el archivo');
                        console.log('Empleado agregado');
                    });
                }else{
                    fs.writeFile(archivo, registro.substr(0, registro.length - 1) + "\n", (err) =>{
                        if(err) throw('No se pudo agregar al archivo');
                        console.log('Empleado agregado');
                    });
                }
                fs.readFile('./public/index.html', 'UTF-8', (err, html) =>{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(html);
                });
            });
        }else{
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 ERROR');
        }
    }
    

}).listen(3000);

console.log('Servidor iniciado...');