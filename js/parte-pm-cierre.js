// Esta es la forma en que se crean los partes, se almacenan las cosas en un objeto y despues se transforma a html y a texto
/** Acción del botón de Crear Parte
 */
function crearParte() {
  let parte = new PuestoMandoCierre(); //Esto se sustituye por el objeto que hay en el fichero objetos.js (PuestoMandoCierre)
  let noError = true;
  parte.fecha = Date.now(); //Fecha

  parte.municipio = municipio.val(); //Municipio

  //Esto son los activos, bajas etc etc del saf, que no te hace falta como ves ahi se selecciona del html con "$" que es el selector, y del "#" es para seleccionar IDs
  parte.pedidos_sium = parseInt($("#m-pedidos").val()) || 0;
  parte.atendidos_sium = parseInt($("#m-atendidos").val()) || 0;
  parte.pendientes = parseInt($("#m-pendientes").val()) || 0;
  parte.incidencias = $("#incidencias").val();

  let clasi = $(".clasificacion");
  //console.log(nuevos_activos);
  for (let i = 0; i < clasi.length; i++) {
    let clasif = new ClasificacionesCierre();
    clasif.clasificacion_id = i;
    clasif.clasificacion = clasi[i].value;
    clasif.atendidos = $("#atendidos-" + i).val();
    clasif.traslados_efectivos = $("#efectivos-" + i).val();

    if (clasif.atendidos >= clasif.traslados_efectivos) {
      if (clasif.atendidos && clasif.traslados_efectivos) {
        parte.clasificaciones.push(clasif);
      }
    } else {
      noError = false;
      $("body").append(`
          <div class="alert alert-danger alert-dismissible fade-in fade show" role="alert" id="alerta">
            <strong>¡Las solicitudes atendidas son menos que los traslados efectivos!</strong>
            <p>Clasificación: ${clasif.clasificacion}</p>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close-alerta">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>`);
    }
  }

  //Comprobar si el numero de activos es mayor que el total de voluntarios
  //if (parte.activos >= parte.total_voluntarios) {
  //formato para Web y Whatsapp
  let html = parteHTML(parte);
  let texto = parteTexto(parte);

  //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML
  if (noError) {
    let area = $("#vista-previa").addClass("card");
    area.html(html);

    //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
    area.append(`<textarea class="form-control">${texto}</textarea>`);
    area.append(
      `<a class="btn btn-info" href="whatsapp://send?text=${encodeURIComponent(
        texto
      )}" target="_blank" action="share/whatsapp/share" >
        Enviar por Whatsapp
        </a>`
    );

    window.localStorage.setItem("parte", JSON.stringify(parte));
    //console.log(parte);
    //console.log(parteHtml);
    //console.log(parteTexto);
  }
  //else {
  // console.log("alertaaaa\n");
  /*$("body").append(`
          <div class="alert alert-warning alert-dismissible fade-in fade show" role="alert" id="alerta">
            <strong>¡Total de Voluntarios del parte.fecha excede los Voluntarios activos!</strong>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close-alerta">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>`);
      area.html("").removeClass("card");*/
  //}
}
/** Genera el parte en formato HTML
 * @param json formato de datos
 * @returns {string} listo para añadir al elemento contenedor
 */
function parteHTML(json) {
  const fechaActual = formatoFechaCompleta(json.fecha);

  let html = `
      <h4 class="font-weight-bold">${json.municipio}</h4>
      <h5>Día: ${fechaActual}</h5>
      <h6><i class="fa fa-chevron-right"></i>  Registros pedidos al SIUM: ${json.pedidos_sium}</h6>
      <h6><i class="fa fa-chevron-right"></i>  Solicitudes atendidas por el SIUM: ${json.atendidos_sium}</h6>
      <h6><i class="fa fa-chevron-right"></i>  Pendientes de más de 24 horas: ${json.pendientes}</h6>
       `;
  for (let i = 0; i < json.clasificaciones.length; i++) {
    html += `
          <div class="v-cp card">
              <h6 class="font-weight-bold">Clasificación: ${json.clasificaciones[i].clasificacion}</h6>
              <p>
                  <br>
                  <i class="fa fa-chevron-right"></i> Atendidos: ${json.clasificaciones[i].atendidos}
                  <br>
                  <i class="fa fa-chevron-right"></i> Traslados efectivos: ${json.clasificaciones[i].traslados_efectivos}
              </p>
          </div>`;
  }

  html += `<div class="v-comentario"><p>${json.incidencias}</p></div>`;
  return html;
}

/** genera el parte en formato texto para ser enviado a Whatsapp
 * @param json formato de datos
 * @returns {string} Listo para enviar a mensaje de Whatsapp
 */
function parteTexto(json) {
  const fechaActual = formatoFechaCompleta(json.fecha);

  let texto = `**${json.municipio}**
      Día: ${fechaActual} 
        ◽ Cantidad de pedidos al SIUM: ${json.pedidos_sium} 
        💚 Cantidad de atendidos por el SIUM: ${json.atendidos_sium} 
        🔸 Pendientes mas de 24 horas: ${json.pendientes} \n
      `;

  for (let i = 0; i < json.clasificaciones.length; i++) {
    texto += `🏘 **Clasificacion de Paciente: ${json.clasificaciones[i].clasificacion} **
              • Atendidos: ${json.clasificaciones[i].atendidos} 
              • Traslados efectivos: ${json.clasificaciones[i].traslados_efectivos} \n
          `;
  }

  if (json.incidencias) {
    texto += `__${json.incidencias}__`;
  }
  // JSON STRING
  texto += `\n\n\n\n##DATA##${JSON.stringify(json)}`;
  return texto;
}
