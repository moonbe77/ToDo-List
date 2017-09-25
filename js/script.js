/*
1.ingresar tareas (asignar: id unico, titulo, descripcion,      completado)"objeto"dentro de un array
2. mostrar las tareas ingresadas
3. formatear las tareas segun el estado
4. metodos para eliminar , completar, descompletar, editar,     buscar

*/
var form = document.getElementById("formCreate")
var showTask = document.getElementById("showTask")
var tareas = []// no es necesario
var obTarea ={}
//objeto tarea
/*var objetoTarea = {
    id: 0,
    titulo:"algo",
    desc: "algo"
}*/

function crearTarea(titulo,desc){
    this.id=todo+Date.now()             //metodo para generar el id unico
    this.titulo= titulo
    this.desc=desc
    this.completado = false
}
var addTask= function(event){
    event.preventDefault()
    var titulo = form[0].value
    var desc = form[1].value
        obTarea = new crearTarea(titulo,desc)
        almacenar(obTarea.id,obTarea)
    console.log(obTarea)
}

var almacenar = function (id,tarea) {
    localStorage.setItem(id,JSON.stringify(tarea))
    tarea.id
    mostrarTareas(tarea.id,tarea.titulo,tarea.desc)
}

var recuperarTareas = function (){

    localStorage.getItem(id,JSON.stringify(tarea))
}

var mostrarTareas= function (id,titulo,desc){
var newBox = document.createElement("div")
var contenido = '<div class="box"><div class="id">'+id+'</div><div class="titulo">'+titulo+'</div><div class="descr">   '+desc+'</div><nav class="level is-mobile"><div class="level-left"><a class="level-item"><span class="icon is-small"><i class="fa fa-reply"></i></span></a><a class="level-item"><span class="icon is-small"><i class="fa fa-retweet"></i></span>    </a><a class="level-item"><span class="icon is-small"><i class="fa fa-heart"></i></span>    </a></div></nav></div>';
newBox.innerHTML = contenido
showTask.appendChild(newBox)
}
