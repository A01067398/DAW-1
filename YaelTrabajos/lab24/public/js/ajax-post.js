$("#btnGuardar").click(function(){
    $.post("/empleado/save",
    {
      nombres: "Hola",
      apellidos: "Mundo"
    },
    function(data, status){
      alert("Status: " + status);
    });
  });