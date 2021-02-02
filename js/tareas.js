let universidad = $("#universidad");

$(document).ready(function () {
  universidad.html('<option value="NO SELECCIONADO">-</option>');
  $.each(universidades, function (index, value) {
    universidad.append('<option value="' + value + '">' + value + "</option>");
  });

  let index = 0;
  tareas.forEach(function (element) {
    addNuevaTarea();
    document.getElementById(`tarea-label-${index}`).value = element;
    document.getElementById(`tarea-label-${index}`).disabled = true;
    document.getElementById(`delete-${index}`).remove();
    index += 1;
  });
});

/** Acción de añadir clasificacion
 */
function addNuevaTarea() {
  let container = $("#tareas-container").addClass("card");
  let count = $(".covid-form").length;

  if (count === 0) {
    container.append(`<h5 id="tareas-label">Tareas:</h5>`);
  }
  container.append(`
      <div class="covid-form row mb-3" id="tarea-form-${count}">
          <div class="col-10 p-0">
              <div class="form-check w-100">
              <input class="form-check-input tarea" type="checkbox" id="tarea-${count}" value="">
              <input class="form-check-label tarea-label" style="min-width:80%" type="text" id="tarea-label-${count}" min="0" placeholder="tarea">
              </div>
          </div>
          <button class="btn btn-danger col-2 btn-sm m-0" id="delete-${count}" onclick="deleteClasificacion(${count})">
      <i class="fa fa-trash"></i></button>
      </div>`);
}

// Todo esto tambien tienes que adaptarlo segun el nombre que le pongas a la funcion
/** Acción del boton de eliminar Nuevo Activo
 * @param idNA
 */
function deleteClasificacion(idNA) {
  $("#tarea-form-" + idNA).remove();
}
