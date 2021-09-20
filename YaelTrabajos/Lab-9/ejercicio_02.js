	var http = require("http"), fs = require("fs");
	const archivo = 'prueba.txt';

	function escribir(cadena) {	  
	  fs.writeFileSync(archivo, cadena);
		console.log('se ha escrito en el archivo: '+cadena);
	}

	function execute(someFunction, value) {
	  someFunction(value);
	}

	http.createServer(function(req,res){

		if(fs.existsSync(archivo)){
				console.log('el archivo si existe');
				const contenido = 'saludos este string se guardara en un archivo de texto - se sobre escribira prueba 3';
				execute(escribir, contenido);
			}
			else{
				console.log('el archiv no existe');
				const contenido = 'saludos este string se guardara en un archivo de texto';
				execute(escribir, contenido);
			}

		res.end();		

	}).listen(8080);