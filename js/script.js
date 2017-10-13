/*
1. ingresar tareas (asignar: id unico, titulo, descripcion,completado)"objeto"dentro de un array
2. mostrar las tareas ingresadas
3. formatear las tareas segun el estado
4. metodos para eliminar , completar, descompletar, editar,     buscar
*/

var objetos={}

function CrearTarea(id,titulo,desc,realizado){ //constructor del objeto tarea
    this.id= id
    this.titulo= titulo
    this.desc=desc
    this.completado = realizado //boleno es true or false
}

var addTask= function(event){
    event.preventDefault()
    var id="td"+Date.now()  //metodo para generar el id unico
    var titulo = form[0].value
    var desc = form[1].value
    var obTarea = new CrearTarea(id,titulo,desc,"false")
        almacenar(obTarea.id,obTarea)
    console.log(obTarea)
}
var almacenar = function (id,objetoTarea) {
    localStorage.setItem(id,JSON.stringify(objetoTarea))
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
            mostrarTareas(tarea)
            objetos =+ tarea
        }else{
        showTask.innerHTML = "<h3>No hay tareas</h3>"}//esto solo se muestra si hay algun dato en LS y no es una clave de la todo list
      }
      crearEvento()
      return objetos
}


//funcion para eliminar tareas
var removeTask = function(event){
    var r = confirm("estas Segur@!");
    if (r == true) {
        localStorage.removeItem(event.currentTarget.parentNode.id);
        console.log("Removiendo Tarea id=", event.currentTarget.parentNode.id)
    }    
    showTask.innerHTML = ""
    recuperarTareas()    
}
//funcion que carga los valores de la tarea en el formulario para editarlos y estos son almacenados por la funcion almacenarTareaEditada
var editarTask = function(event){
    console.log("Editando=", event.currentTarget.parentNode.id)
    //recupero la tarea segun el parent id en LS
    var tareaObjeto = localStorage.getItem(event.currentTarget.parentNode.id)
    
        var tarea = JSON.parse(tareaObjeto)             
        var modalTitulo = document.getElementById("modalId").value = tarea.id    
        var modalTitulo = document.getElementById("modalTitulo").value = tarea.titulo
        var modalDesc = document.getElementById("modalDesc").value = tarea.desc  

    mostrarModal()             
}

var realizarTask = function(event){
    console.log("realizado=", event.currentTarget.parentNode.id)
    var tareaObjeto = localStorage.getItem(event.currentTarget.parentNode.id)
    var tarea = JSON.parse(tareaObjeto)  
        tarea.completado = true 
        localStorage.setItem(event.currentTarget.parentNode.id,JSON.stringify(tarea))
    showTask.innerHTML = ""
    recuperarTareas()  
}





var almacenarTareaEditada = function (event) {
    event.preventDefault()
    var tdId = formModal[0].value
    var titulo = formModal[1].value
    var desc = formModal[2].value
    var realizado = "false"
        objeto = new CrearTarea(tdId,titulo,desc,realizado)
        almacenar(tdId,objeto)
    console.log("Editado: ",objeto)
    mostrarModal() 
}

var devolverFecha = function(fechaT){
    var fTarea = new Date(fechaT)
    var tDia = fTarea.getDate()
    var tMes = fTarea.getMonth()
    var tAnio = fTarea.getFullYear()
    var  fecha = tDia+"/"+tMes+"/"+tAnio 
    return fecha
}

var ordenar = function (){
    //ordenar las tareas antes de mostrarlas
}