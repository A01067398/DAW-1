var http = require("http"), 
	fs = require("fs");

	const archivo = 'prueba.txt';

function escribir(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}



http.createServer(function(req,res){
	
	fs.readFile("./ejercicio5.html",function(err,html){
	res.write(html);	


if(fs.existsSync(archivo)){
console.log('el archivo si existe');


}else{
	console.log('el archiv no existe');
const contenido = 'saludos este string se guardara en un archivo de texto';
fs.writeFileSync(archivo, contenido);
	console.log('se ha escrito en el archivo');
}

		


execute(escribir, "Hello");

		
		res.end();	



	});

}).listen(8080);









