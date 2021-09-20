var http = require("http"), 
	fs = require("fs");
	

function actualizarInventario(cantiExistente,CantidadCompraRecibida) {
  //console.log(word);  
	console.log('total es: '+ (cantiExistente+CantidadCompraRecibida));
}

function execute(someFunction, value,value2) {
  someFunction(value,value2);
}



http.createServer(function(req,res){
	
	fs.readFile("./index.html",function(err,html){
	res.write(html);	

	console.log('el archiv no existe');
const contenido = 'saludos este string se guardara en un archivo de texto';
var existen = 40;
var secompraron = 7;
execute(actualizarInventario, existen, secompraron );		




		
		res.end();	



	});

}).listen(8080);









