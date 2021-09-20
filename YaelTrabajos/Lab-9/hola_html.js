var http = require("http"), 
	fs = require("fs");

let frutas = ["Manzana", "Banana"]


function say(frutas) {
  console.log(frutas[0]);
}

function execute(someFunction, value) {
  someFunction(someFunction[value]);
}



//var html = fs.readFileSync("./index.html");


// fs.readFile("./index.html",function(err,html){

// 	http.createServer(function(req,res){
	
// 	res.write(html);
// 	res.end();

// 		}).listen(8080);

// });



http.createServer(function(req,res){
	
	fs.readFile("./index.html",function(err,html){
		
//res.writeHead(200,{});//todo bien
//res.writeHead(300,{});//contenido movido
//res.writeHead(400,{});//no encontrado
//res.writeHead(500,{});//ERROR



		res.writeHead(200,{"Content-Type":"application/json"});
		//res.write(html);
		res.write(JSON.stringify({nombre: "Gian", username: "Emanuel"}));

		// var i = 0;
		// while (i<11) {
		// 	i++;
		// 	res.write(i+"<br>");
			
		// }


execute(say[0], 0);

		
		res.end();	



	});

}).listen(8080);









