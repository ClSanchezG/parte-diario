$(document).ready(function () {
  console.log("hellooo", clasificaciones);

  clasificaciones.forEach((element, index) => {
    addNuevaClasificacion();
    console.log("index", document.getElementById(`clasif-${index}`));
    document.getElementById(`clasif-${index}`).value = element.clasificacion;
    document.getElementById(`clasif-${index}`).disabled = true;
  });
});

/** Acción de añadir clasificacion
 * esto es como pa plantilla de las clasificaciones, cada vez que querramos crear una llamamos a esta funcion
 */
function addNuevaClasificacion() {
  let container = $("#clasificacion-container").addClass("card"); //añade la clase card para que salga el borde si ya existia no pasa nada
  let count = $(".clasificacion").length; //contador para poner el id que corresponde
  // na: numero de activos, lo puedes modificar por clasificacion que es de lo que va este formulario (abajo te dejo un ejemplo)
  if (count === 0) {
    //Esto es para cuando no habia ninguna insertada porque esto es a modo de titulo general
    container.append(
      '<h5 id="clasificacion-label">Clasificaciones de Pacientes:</h5>'
    ); //aqui el id era na-label
  }
  // Todo: Esta es la plantilla de lo que es en realidad una clasificacion, esto esta con los activos del SAF pero hay que modificarlo como explique arriba
  // las cosas estan con bootstrap, entonces las clases de row, col-..., btn, son las cosas de bootstrap, no hay css.
  container.append(`
    <div class="covid-form row" id="clasificacion-form-${count}">
        <div class="col-11">
            <span class="row">
                <input class="form-control clasificacion col-10 col-md-4" type="text" id="clasif-${count}" min="1" placeholder="Clasificación">
                <input class="form-control clasificacion col-2" type="number" id="clasif-cant-${count}" min="0">
                <input class="form-control clasificacion col-12 col-md-6" type="text" id="clasif-obs-${count}" min="0" placeholder="Observaciones">
            </span>
        </div>
        <div class="col-1">
            <span class="row">
                <button class="btn btn-danger btn-sm" onclick="deleteClasificacion(${count}})">
                <i class="fa fa-trash"></i></button>
            </span>
        </div>
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
