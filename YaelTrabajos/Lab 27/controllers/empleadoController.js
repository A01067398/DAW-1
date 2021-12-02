const Empleado = require('../models/empleado');

exports.index = (request, response, next) => {

    if(!request.session.contador){
        request.session.contador = 0;
    }
    response.setHeader('Set-Cookie', 'myCookie=valor_cookie; HttpOnly');
    response.render("index", {titulo: "LAB 17: Cookie & Session", contador: request.session.contador});
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

    const empleados = Empleado.fetchAll();
    empleados.forEach(element => {        
        if(element != ""){
            json.empleados.push({"codigo":  element.codigo, "nombres": element.nombres, "apellidos": element.apellidos });            
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
    
    request.session.contador = request.session.contador ? ++request.session.contador : 1
    response.redirect('/');
};

exports.reset = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.cuestionario = (request, response, next) => {
    response.render("cuestionario");
};

exports.error404 = (request, response, next) => {
    response.status(404).render("404"); 
}

