/*
1.ingresar tareas (asignar: id unico, titulo, descripcion,completado)"objeto"dentro de un array
2. mostrar las tareas ingresadas
3. formatear las tareas segun el estado
4. metodos para eliminar , completar, descompletar, editar,     buscar

*/
var form = document.getElementById("formCreate")
var formModal = document.getElementById("formModal")
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
function modificarTarea(id,titulo,desc,realizado){ //constructor del objeto tarea
    this.id=id  //metodo para generar el id unico
    this.titulo= titulo
    this.desc=desc
    this.completado = realizado
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
    //tarea.id    
    showTask.innerHTML = ""
    recuperarTareas()
}

var recuperarTareas = function (){ //busco las tareas en LocalStorage y las muestro usando la funcion mostrarTareas()
 
    for (x=0; x<=localStorage.length-1; x++)  {  
        clave = localStorage.key(x); 
        //console.log(clave)
        var tareaID = localStorage.getItem(clave) 
        if (clave.indexOf("td") != -1) { //*****MEJORAR ESTA CONDICION PARA VER SI ES UN DATO DEL TODO LIST O OTRO*****
            //console.log(tareaID)
            var tarea = JSON.parse(tareaID)
            mostrarTareas(tarea.id,tarea.titulo,tarea.desc)         
        }else{
        showTask.innerHTML = "<h3>No hay tareas</h3>"}//esto solo se muestra si hay algun dato en LS y no es una clave de la todo list
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

var editarTask = function(event){
    console.log("Editando=", event.currentTarget.parentNode.id)

    var tareaObjeto = localStorage.getItem(event.currentTarget.parentNode.id) 
    
        var tarea = JSON.parse(tareaObjeto)             
        var modalTitulo = document.getElementById("modalId").value = tarea.id    
        var modalTitulo = document.getElementById("modalTitulo").value = tarea.titulo
        var modalDesc = document.getElementById("modalDesc").value = tarea.desc  

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

var almacenarTareaEditada = function (event) {
    event.preventDefault()
    var tdId = formModal[0].value
    var titulo = formModal[1].value
    var desc = formModal[2].value
    var realizado = "false"
        objeto = new modificarTarea(tdId,titulo,desc,realizado)
        almacenar(tdId,objeto)
    console.log("Editado: ",objeto)
    mostrarModal() 
}