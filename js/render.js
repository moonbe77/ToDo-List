var form = document.getElementById("formCreate")
var formModal = document.getElementById("formModal")
var showTask = document.getElementById("showTask")
var eliminar = document.getElementsByClassName("eliminar")
var editar = document.getElementsByClassName("editar")
var realizado = document.getElementsByClassName("realizado")
var modal = document.getElementById("modal")

var mostrarTareas= function (tarea){  
    var res = Number(tarea.id.slice(2))
    var fecha = devolverFecha(res)
/*usando nueva sintaxis para concatenar variables*/
var boxContent = `
<div class="box  ${'completado-'+tarea.completado}">\    
    <div class="titulo is-primary is-bold center"><b>${tarea.titulo}</b>
    <div class="fecha">${fecha}</div>\
    </div>\
    <div class="descr">${tarea.desc}</div>\
    <nav class="level is-mobile" >
        <div class="level-right" id="${tarea.id}">\
            <a class="level-item realizado" dataID="${tarea.id}"><span class="icon"><i class="fa fa-check" title="Tarea Realizada"></i></span></a>\
            <a class="level-item editar" dataID="${tarea.id}"><span class="icon"><i class="fa fa-pencil" title="Editar"></i></span></a>\
            <a class="level-item eliminar" title="Eliminar Tarea" dataID="${tarea.id}" dataID="${tarea.id}"><span class="icon"><i class="fa fa-trash-o"></i></span></a>\
        </div>\
    </nav>\
</div>`;    
var newBox = document.createElement("div")
newBox.innerHTML = boxContent
showTask.appendChild(newBox)
crearEvento()    
}

var mostrarModal= function(){    
    modal.classList.toggle("is-active") //con toggle lo que hace es agregar o quitar la clase si ya fue agregada    
}
//asigna los eventos a las tareas mostradas
function crearEvento(){
    for (var i = 0; i < eliminar.length; i++) {
        eliminar[i].addEventListener('click', removeTask)
        editar[i].addEventListener('click', editarTask)
        realizado[i].addEventListener('click', realizarTask)
    } 
}