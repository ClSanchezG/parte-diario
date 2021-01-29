$(document).ready(function () {
  let index = 0;
  clasificaciones.forEach(function (element) {
    addNuevaClasificacion();
    document.getElementById(`clasif-${index}`).value = element.clasificacion;
    document.getElementById(`clasif-${index}`).disabled = true;
    document.getElementById(`delete-${index}`).remove();

    index += 1;
  });
  $("#municipio").append('<option value="La Habana">La Habana</option>');
});

/** Acción de añadir clasificacion
 * esto es como pa plantilla de las clasificaciones, cada vez que querramos crear una llamamos a esta funcion
 */
function addNuevaClasificacion() {
  let container = $("#clasificacion-container").addClass("card"); //añade la clase card para que salga el borde si ya existia no pasa nada
  let count = $(".covid-form").length; //contador para poner el id que corresponde
  if (count === 0) {
    //Esto es para cuando no habia ninguna insertada porque esto es a modo de titulo general
    container.append(
      '<h5 id="clasificacion-label" class=" mb-3">Clasificaciones de Pacientes:</h5>'
    ); //aqui el id era na-label
  }
  // Todo: Esta es la plantilla de lo que es en realidad una clasificacion, esto esta con los activos del SAF pero hay que modificarlo como explique arriba
  // las cosas estan con bootstrap, entonces las clases de row, col-..., btn, son las cosas de bootstrap, no hay css.
  container.append(`
    <div class="covid-form row mb-3" id="clasificacion-form-${count}">
      <input class="form-control clasificacion col-12" type="text" id="clasif-${count}" min="1" placeholder="Clasificación">     
      <span class="col-4"><label>Cantidad: </label></span>
      <input class="form-control clasificacion-cant col-8" type="number" value="0" id="clasif-cant-${count}" min="0">
      <input class="form-control clasificacion-obs col-12" type="text" id="clasif-obs-${count}" min="0" placeholder="Observaciones">
      <button class="btn btn-danger col-12 btn-sm" id="delete-${count}" onclick="deleteClasificacion(${count})">
      <i class="fa fa-trash"></i> Eliminar</button>
    </div>`);
  return count;
}

// Todo esto tambien tienes que adaptarlo segun el nombre que le pongas a la funcion
/** Acción del boton de eliminar Nuevo Activo
 * @param idNA
 */
function deleteClasificacion(idNA) {
  let count = $(".na").length;
  if (count === 1) {
    $("#clasificacion-label").remove();
    $("#clasificacion-container").removeClass("card");
  }
  $("#clasificacion-form-" + idNA).remove();
}
