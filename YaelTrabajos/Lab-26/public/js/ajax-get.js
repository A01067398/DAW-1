window.addEventListener('DOMContentLoaded', e =>{
    fetch('http://localhost:3000/empleado/get-all-ajax')
    .then(res => res.json())
    .then(data =>{
        if(data.response === 'success'){
            
            const todos = data.data.empleados;
            console.log(data.data.empleados);
            let contenido = ``;

            todos.forEach(item =>{
                contenido += `
                <tr>
                    <td>${item.codigo}</td>
                    <td>${item.nombres}</td>
                    <td>${item.apellidos}</td>
                </tr>`
            });
            document.querySelector("#todos").innerHTML = `
            <table class="table">
                <thead>
                    <th>Código</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                </thead>
                <tbody>
                    ${contenido}
                </tbody>
            </table>
            `;
        }
    })
    .catch(err =>{
        console.error(err);
    });
    
});