const empleados = [];

module.exports = class Empleado {

    constructor(codigo, nombres, apellidos) {
        this.codigo = codigo;
        this.nombres = nombres;
        this.apellidos = apellidos;
    }

    save() {
        empleados.push(this);
    }

    static fetchAll() {
        return empleados;
    }
}