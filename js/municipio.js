let municipio = $("#municipio");

/** Al iniciar el documento se rellenan las listas desplegables de los municipios y se crea un
 * consejo Popular
 */
$(document).ready(function () {
  municipio.html('<option value="NO SELECCIONADO">-</option>');
  $.each(municipios, function (index, value) {
    municipio.append(
      '<option value="' + value.nombre + '">' + value.nombre + "</option>"
    );
  });
  let cp = $("#consejo-popular");
  if (cp) {
    cp.disabled = true;
    let consejosPopulares = $(".cp-data");
    $.each(consejosPopulares, function (index) {
      updateTotalVoluntario(index);
    });
  }
  /*
  let parte = window.localStorage.getItem("parte");
  if (parte) {
    parte = JSON.parse(parte);
    setPrevio(parte);
  } else {
    addconsejoPopular();
  }*/
  $("#close-alerta").on("click;", function () {
    this.preventDefault();
  });
});

/** Obtiene los consejos Populares correspondientes con sus municipios
 * @returns {[]} arreglo de consejos populares (municipio, cp)
 */
function getConsejosPopulares() {
  let cps = [];
  for (let i = 0; i < municipios.length; i++) {
    let municipio = municipios[i];
    for (let j = 0; j < municipio.cp.length; j++) {
      cps.push({
        municipio: municipio.nombre,
        cp: municipio.cp[j],
      });
    }
  }
  return cps;
}

/** Al cambiar de municipio se actualizan las listas desplegables de los Consejos Populares
 */
municipio.on("change", function () {
  let cps = getConsejosPopulares();
  $(".consejo-popular").html(
    '<option value="NO SELECCIONADO">-</option>'
  ).disabled = false;
  let mun = $(this).val();
  $.each(cps, function (index, value) {
    if (value.municipio === mun) {
      $(".consejo-popular").append(
        '<option value="' + value.cp + '">' + value.cp + "</ooption>"
      );
    }
  });
  municipio = $(this);
});

/** Acción del poton eliminar del consejo Popular
 * @param idCP identificador numérico del consejo popular a eliminar
 */
function deleteConsejoPopular(idCP) {
  $("#cp-form" + idCP).remove();
}
