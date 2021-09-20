var http = require("http"), fs = require("fs");
var miArray	=[];

function actualizarInventario(cantiExistente,CantidadCompraRecibida) {  
	console.log('total es: '+ (cantiExistente+CantidadCompraRecibida));
}

function execute(someFunction, value,value2) {
  someFunction(value,value2);
}



http.createServer(function(req,res){
	
	fs.readFile("./index.html",function(err,html){
	res.write(html);	

console.log('Ingresando compras al sistema de inventario');
var existen = 40;
var secompraron = 7;
execute(actualizarInventario, existen, secompraron );	
		console.log(miArray);


		res.end();	
	});

}).listen(8080);









