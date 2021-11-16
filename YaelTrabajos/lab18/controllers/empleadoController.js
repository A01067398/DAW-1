const Empleado = require('../models/empleado');

exports.index = (request, response, next) => {

    if(!request.session.contador){
        request.session.contador = 0;
    }
    response.setHeader('Set-Cookie', 'myCookie=valor_cookie; HttpOnly');
    response.render("index", {titulo: "LAB 17: Cookie & Session", contador: request.session.contador});
};

exports.list = (request, response, next) => {
    Empleado.fetchAll()
        .then(([empleados, fieldData]) => {
            response.render("list", {empleados: empleados});
        })
        .catch(err => console.log(err));
};

exports.create = (request, response, next) => {
    response.render("create");
};

exports.save = (request, response, next) => {
    const nombres = request.body.nombres;
    const apellidos = request.body.apellidos;

    const empleado = new Empleado(0, nombres, apellidos);
    empleado.save();
    
    request.session.contador = request.session.contador ? ++request.session.contador : 1
    response.redirect('/');
};

exports.edit = (request, response, next) => {
    const id = request.query.id;
    Empleado.search(id)
        .then(([empleados, fieldData]) => {
            if(empleados.length > 0){
                response.render("edit", {item: empleados[0]});
            }            
        })
        .catch(err => console.log(err));  
};

exports.update = (request, response, next) => {
    const nombres = request.body.nombres;
    const apellidos = request.body.apellidos;
    const codigo = request.body.codigo;

    const empleado = new Empleado(codigo, nombres, apellidos);
    empleado.update();
    
    response.redirect('/'); 
};

exports.delete = (request, response, next) => {
    const id = request.query.id;
    Empleado.delete(id)
        .then(([result, fieldData]) => {
            if(result){
                response.redirect('/');
            } 
        })
        .catch(err => console.log(err));  
};

exports.reset = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.error404 = (request, response, next) => {
    response.status(404).render("404"); 
}

