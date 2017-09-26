/*
1.ingresar tareas (asignar: id unico, titulo, descripcion,completado)"objeto"dentro de un array
2. mostrar las tareas ingresadas
3. formatear las tareas segun el estado
4. metodos para eliminar , completar, descompletar, editar,     buscar

*/
var form = document.getElementById("formCreate")
var showTask = document.getElementById("showTask")
var eliminar = document.getElementsByClassName("eliminar")
var editar = document.getElementsByClassName("editar")
var realizado = document.getElementsByClassName("realizado")
var modal = document.getElementById("modal")
var tareas = []// no es necesario
var obTarea ={}

//objeto tarea
/*var objetoTarea = {
    id: 0,
    titulo:"algo",
    desc: "algo"
}*/

function crearTarea(titulo,desc){ //constructor del objeto tarea
    this.id="td"+Date.now()  //metodo para generar el id unico
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

var recuperarTareas = function (){ //busco las tareas en LocalStorage y las muestro usando la funcion mostrarTareas()
    for (x=0; x<=localStorage.length-1; x++)  {  
        clave = localStorage.key(x); 
        //console.log(clave)
        var tareaID = localStorage.getItem(clave) 
        if (clave.indexOf("td") != -1) {
            //console.log(tareaID)
            var tarea = JSON.parse(tareaID)
            mostrarTareas(tarea.id,tarea.titulo,tarea.desc)         
        }
      }
      crearEvento()
}

var mostrarTareas= function (id,titulo,desc){
    var boxContent = '<div class="box">\
    <div class="id">Id: '+id+'</div>\
        <div class="titulo"><b> Titulo:'+titulo+'</b></div>\
        <div class="descr">Tarea: '+desc+'</div>\
        <nav class="level is-mobile" ><div class="level-left" id="'+id+'">\
        <a class="level-item eliminar" title="Eliminar Tarea" dataID="'+id+'" dataID="'+id+'">\
        <span class="icon is-small"><i class="fa fa-trash-o"></i></span></a>\
        <a class="level-item editar" dataID="'+id+'"><span class="icon is-small"><i class="fa fa-pencil" title="Editar"></i></span></a>\
        <a class="level-item realizado" dataID="'+id+'"><span class="icon is-small"><i class="fa fa-heart"></i></span></a>\
        </div>\
        </nav>\
    </div>';    
    var newBox = document.createElement("div")
    newBox.innerHTML = boxContent
    showTask.appendChild(newBox)
    crearEvento()    
}

var removeTask = function(event){
    localStorage.removeItem(event.currentTarget.parentNode.id);
    console.log("Removiendo Tarea id=", event.currentTarget.parentNode.id)
    showTask.innerHTML = ""
    recuperarTareas()    
}

var editarTask = function(){
    console.log("Editando=", event.currentTarget.parentNode.id)
    //localStorage.removeItem(event.currentTarget.parentNode.id);
    
    var modalTitulo = document.getElementById("modalId").placeholder = event.currentTarget.parentNode.id    
    var modalTitulo = document.getElementById("modalTitulo").placeholder = "Test"
    var modalDesc = document.getElementById("modalDesc").placeholder = "test"

    mostrarModal()             
}

var realizarTask = function(){
    //localStorage.removeItem(event.currentTarget.parentNode.id);
    console.log("realizado=", event.currentTarget.parentNode.id)
    showTask.innerHTML = ""
    recuperarTareas()  
}

function crearEvento(){
    for (var i = 0; i < eliminar.length; i++) {
        eliminar[i].addEventListener('click', removeTask)
        editar[i].addEventListener('click', editarTask)
        realizado[i].addEventListener('click', realizarTask)
    } 
}

var mostrarModal= function(){    
    modal.classList.toggle("is-active") //con toggle lo que hace es agregar o quitar la clase si ya fue agregada    
}

var editarTarea = function (params) {
    event.preventDefault()
    var titulo = form[0].value
    var desc = form[1].value
        obTarea = new crearTarea(titulo,desc)
        almacenar(obTarea.id,obTarea)
    console.log(obTarea)
}