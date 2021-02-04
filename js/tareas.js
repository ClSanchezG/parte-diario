let universidad = $("#universidad");

$(document).ready(function () {
  initTareas();
});

/** Acción de añadir clasificacion
 */
function addNuevaTarea() {
  let container = $("#tareas-container").addClass("card");
  let count = $(".covid-form").length;

  if (count === 0) {
    container.append(`<h5 id="tareas-label">Tareas:</h5>`);
  }
  container.append(`<div class="covid-form row mb-3" id="tarea-form-${count}">
      <input class="form-control tarea col-11" type="text" id="tarea-${count}" min="1" placeholder="Tarea">   
      <div class="input-group-prepend col-1">
          <span class="btn btn-success" onclick="addNuevoMunicipio(${count})"><i class="fa fa-plus"></i></span>
      </div>  
      <div class="input-group" id="input-${count}-0">
        <select class="form-control municipio" id="select-mun-${count}-0" name="municipio">
            <option value="NO SELECCIONADO">Municipio</option>
        </select>
        <input class="form-control tarea-cant col-12" type="number" id="tarea-cant-${count}-0" min="0" placeholder="Cantidad">
      </div>
    </div>`);

  let muni = $("#select-mun-" + count + "-0");
  municipios.forEach(function (element) {
    muni.append(
      '<option value="' + element.nombre + '">' + element.nombre + "</option>"
    );
  });
}

// Todo esto tambien tienes que adaptarlo segun el nombre que le pongas a la funcion
/** Acción del boton de eliminar Nuevo Activo
 * @param idNA
 */
function deleteClasificacion(idNA) {
  $("#tarea-form-" + idNA).remove();
}

function addNuevoMunicipio(idNA) {
  let container = $("#tarea-form-" + idNA);
  let count = $("#tarea-form-" + idNA + " .input-group").length;

  container.append(`
      <div class="input-group">
        <select class="form-control municipio" id="select-mun-${idNA}-${count}" name="municipio">
          <option value="NO SELECCIONADO">Municipio</option>
        </select>
        <input class="form-control tarea-cant col-12" type="number" id="tarea-cant-${idNA}-${count}" min="0" placeholder="Cantidad">
         <div class="input-group-prepend">
         </div>
    </div>`);

  let muni = $("#select-mun-" + idNA + "-" + count);
  municipios.forEach(function (element) {
    muni.append(
      '<option value="' + element.nombre + '">' + element.nombre + "</option>"
    );
  });
}

function reiniciar() {
  $("#tareas-container").html("").removeClass("card");
  $("#vista-previa").html("").removeClass("card");
  initTareas();
}

function initTareas() {
  universidad.html('<option value="NO SELECCIONADO">-</option>');
  $.each(universidades, function (index, value) {
    universidad.append('<option value="' + value + '">' + value + "</option>");
  });

  let index = 0;
  tareas.forEach(function (element) {
    addNuevaTarea();
    document.getElementById(`tarea-${index}`).value = element;
    document.getElementById(`tarea-${index}`).disabled = true;
    index += 1;
  });
}
