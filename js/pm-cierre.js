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
      <div class="na-form row" id="na-form-${count}">
          <span class="col-4">
              <input class="form-control clasificacion col-11" type="text" id="clasificacion-${count}" min="0" placeholder="Tipo de Paciente">
          </span>
          <span class="col-4">
              <input class="form-control col-11" type="number" id="atendidos-${count}" min="0" placeholder="Solicitudes atendidas">
          </span>
          <span class="col-4">
              <input class="form-control col-11" type="number" id="efectivos-${count}" min="0" placeholder="Traslados efectivos">
          </span>
      </div>`);
}

// Todo esto tambien tienes que adaptarlo segun el nombre que le pongas a la funcion
/** Acción del boton de eliminar Nuevo Activo
 * @param idNA
 */
function deleteNuevoActivo(idNA) {
  let count = $(".na").length;
  if (count === 1) {
    $("#na-label").remove();
    $("#na-container").removeClass("card");
  }
  $("#na-form-" + idNA).remove();
}
