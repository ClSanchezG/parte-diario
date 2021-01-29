$(document).ready(function () {
  let index = 0;
  clasificaciones.forEach(function (element) {
    addNuevaClasificacion();
    document.getElementById(`clasificacion-${index}`).value =
      element.clasificacion;
    document.getElementById(`clasificacion-${index}`).disabled = true;
    document.getElementById(`delete-${index}`).remove();

    index += 1;
  });
  $("#municipio").append('<option value="La Habana">La Habana</option>');
});

/** Acción de añadir clasificacion
 */
function addNuevaClasificacion() {
  let container = $("#clasificacion-container").addClass("card");
  let count = $(".clasificacion").length;

  if (count === 0) {
    container.append(
      `<h5 id="clasificacion-label">Clasificaciones de Pacientes:</h5>
      <div class="row text-center mb-1">
        <span class="col-2 offset-8">SA</span>
        <span class="col-2">TE</span>
      </div>`
    );
  }
  container.append(`
      <div class="covid-form row mb-3" id="clasificacion-form-${count}">
          <span class="col-8">
              <input class="form-control clasificacion" type="text" id="clasificacion-${count}" min="0" placeholder="clasificacion">
          </span>
          <span class="col-2">
              <input class="form-control" type="number" id="atendidos-${count}" min="0">
          </span>
          <span class="col-2">
              <input class="form-control" type="number" id="efectivos-${count}" min="0">
          </span>
          <button class="btn btn-danger col-2 offset-10 btn-sm" id="delete-${count}" onclick="deleteClasificacion(${count})">
      <i class="fa fa-trash"></i> Eliminar</button>
      </div>`);
}

// Todo esto tambien tienes que adaptarlo segun el nombre que le pongas a la funcion
/** Acción del boton de eliminar Nuevo Activo
 * @param idNA
 */
function deleteClasificacion(idNA) {
  $("#clasificacion-form-" + idNA).remove();
}
