/*
1.ingresar tareas (asignar: id unico, titulo, descripcion,completado)"objeto"dentro de un array
2. mostrar las tareas ingresadas
3. formatear las tareas segun el estado
4. metodos para eliminar , completar, descompletar, editar,     buscar

*/

var objetos=[]

function CrearTarea(id,titulo,desc,realizado){ //constructor del objeto tarea
    this.id= id
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
    var id=Date.now()  //metodo para generar el id unico
    var titulo = form[0].value
    var desc = form[1].value
    var obTarea = new CrearTarea(id,titulo,desc,"false")
        almacenar(obTarea.id,obTarea)
    console.log(obTarea)
}

var almacenar = function (id,objetoTarea) {
    localStorage.setItem("td"+id,JSON.stringify(objetoTarea))
    //tarea.id       
    cargarTareas()
}

var cargarTareas = function (tipoOrden){ //busco las tareas en LocalStorage y las muestro usando la funcion mostrarTareas()
    showTask.innerHTML = "" 
    objetos=[]

    for (x=0; x<=localStorage.length-1; x++)  {  
        clave = localStorage.key(x); 
        //console.log(clave)
        var tareaID = localStorage.getItem(clave) 
        if (clave.indexOf("td") != -1) { //*****MEJORAR ESTA CONDICION PARA VER SI ES UN DATO DEL TODO LIST O OTRO*****
            //console.log(tareaID)
           
            var tarea = JSON.parse(tareaID)
            //mostrarTareas(tarea)
            objetos.push(tarea)
        }else{
            showTask.innerHTML = "<h3>No hay tareas</h3>"}//esto solo se muestra si hay algun dato en LS y no es una clave de la todo list
        }
        //muestro las tareas ordenadas desc con el parametro "1" para que sea ASC poner "-1"
        ordenarPorId(objetos,"-1")
        for (var key in objetos) {
            mostrarTareas(objetos[key])
        }
        crearEvento()
      console.log(objetos)
      //return objetos
}

//funcion para eliminar tareas
var removeTask = function(event){
    var r = confirm("estas Segur@!");
    if (r == true) {
        localStorage.removeItem("td"+event.currentTarget.parentNode.id);
        console.log("Removiendo Tarea id=", event.currentTarget.parentNode.id)
    }    
    showTask.innerHTML = ""
    cargarTareas()    
}

var realizarTask = function(event){
    console.log("realizado=", event.currentTarget.parentNode.id)
    var tareaObjeto = localStorage.getItem("td"+event.currentTarget.parentNode.id)
    var tarea = JSON.parse(tareaObjeto)  
        tarea.completado = true 
        localStorage.setItem(event.currentTarget.parentNode.id,JSON.stringify(tarea))
    showTask.innerHTML = ""
    cargarTareas()  
}

var almacenarTareaEditada = function (event) {
    event.preventDefault()
    var tdId = Number(formModal[0].value) // paso a numero para que que al validar la fecha no de error por ser string
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
    var tMes = Number(fTarea.getMonth())+1 //el +1 es porque devuelve un array [0,1,2,3,...,11]
    var tAnio = fTarea.getFullYear()
    var tHour = fTarea.getHours()
    var tMinuto = fTarea.getMinutes()
    var  fecha = tDia+"/"+tMes+"/"+tAnio+" | "+tHour+":"+tMinuto  
    return fecha
}



var ordenarPorId = function (objetos,sortOrder){//sortOrder debe ser 1 o -1
    objetos.sort(function(a,b){ 
        // La función de ordenamiento devuelve la comparación entre property de a y b.
         // El resultado será afectado por sortOrder. 
        return (a.id-b.id)*sortOrder; 
    })    
    return objetos
    }
