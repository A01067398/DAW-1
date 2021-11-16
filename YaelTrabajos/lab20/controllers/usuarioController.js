const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

exports.list = (request, response, next) => {
  Usuario.fetchAll()
    .then(([usuarios, fieldData]) => {
      response.render("usuario/list", { usuarios: usuarios });
    })
    .catch((err) => console.log(err));
};

exports.add = (request, response, next) => {
  response.render("usuario/add");
};

exports.save = (request, response, next) => {
  const username = request.body.username;
  const password = request.body.password;

  Usuario.encriptarPassword(password)
    .then((hash) => {
      const usuario = new Usuario(0, username, hash);
      usuario
        .save()
        .then(() => {
          response.redirect("/usuario/list");
        })
        .catch((err) => {
          response.render("usuario/add", { error: err.sqlMessage });
        });
    })
    .catch((err) => {
      response.render("usuario/add", { error: err });
    });
};

exports.delete = (request, response, next) => {
  const id = request.query.id;
  Usuario.delete(id)
      .then(([result, fieldData]) => {
          if(result){
              response.redirect('/usuario/list');
          } 
      })
      .catch(err => console.log(err));  
};

exports.login = (request, response, next) => {
  const username = request.body.username;
  const password = request.body.password;

  Usuario.searchByUsername(username)
    .then(([usuarios, fieldData]) => {
      if (usuarios.length > 0) {
        user = usuarios[0];
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              request.session.isLoggedIn = true;
              request.session.user = user;
              return request.session.save((err) => {
                response.redirect("/");
              });
            }
            response.render("index", { error: "Credenciales incorrectas" });
          })
          .catch((err) => {
            response.render("index", { error: err });
          });
      } else {
        response.render("index", { error: "Credenciales incorrectas" });
      }
    })
    .catch((err) => {
      response.render("index", { error: err.sqlMessage });
    });
};

exports.register = (request, response, next) => {
  response.render("register", { error: "" });
};

exports.saveRegister = (request, response, next) => {
  const username = request.body.username;
  const password = request.body.password;

  Usuario.encriptarPassword(password)
    .then((hash) => {
      const usuario = new Usuario(0, username, hash);
      usuario
        .save()
        .then(() => {
          response.redirect("/login");
        })
        .catch((err) => {
          response.render("register", { error: err.sqlMessage });
        });
    })
    .catch((err) => {
      response.render("register", { error: err });
    });
};
