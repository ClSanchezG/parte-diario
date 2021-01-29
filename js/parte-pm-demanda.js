// Esta es la forma en que se crean los partes, se almacenan las cosas en un objeto y despues se transforma a html y a texto
/** Acción del botón de Crear Parte
 */
function crearParte() {
  let parte = new PuestoMandoDemanda(); //Esto se sustituye por el objeto que hay en el fichero objetos.js (PuestoMandoCierre)

  parte.fecha = formatoFecha($("#date").val()); //Fecha

  parte.municipio = municipio.val(); //Municipio

  let clasificaciones = document.querySelectorAll(".cp-data");

  for (let i = 0; i < clasificaciones.length; i++) {
    //Datos de los Consejos Populares
    let nuevo_cp = new ParteConsejoPopular();

    parte.clasificaciones.push(nuevo_cp);
  }

  parte.observaciones = $("#observaciones").val();
  let area = $("#vista-previa").addClass("card");
  //Comprobar si el numero de activos es mayor que el total de voluntarios

  //formato para Web y Whatsapp
  // let html = parteHTML(parte);
  let texto = parteTexto(parte);

  //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML

  //area.html(html);

  //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
  area.append(`<textarea  class="form-control">${texto}</textarea>`);
  /*area.append(
    `<a class="btn btn-info" href="https://telegram.me/share/url?url=cierre&text=${encodeURIComponent(
      texto
    )}" target="_blank" action="share/telergam/share" >
      Enviar por Telegram
      </a>`
  );*/

  //window.localStorage.setItem("parte-pm-demanda", JSON.stringify(parte));
  //console.log(parte);
  //console.log(parteHtml);
  //console.log(parteTexto);
  /*  $("body").append(`
        <div class="alert alert-warning alert-dismissible fade-in fade show" role="alert" id="alerta">
          <strong>¡Total de Voluntarios del parte.fecha excede los Voluntarios activos!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close-alerta">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
    area.html("").removeClass("card");
  */
}

/** Genera el parte en formato HTML
 * @param json formato de datos
 * @returns {string} listo para añadir al elemento contenedor
 */
function parteHTML(json) {
  let html = `
    <h4 class="font-weight-bold">Municipio: ${json.municipio}</h4>
    <h5>Día: ${json.fecha}</h5>
    <h5>Pacientes:</h5>
    `;

  for (let i = 0; i < json.clasificaciones.length; i++) {
    html += `
        <div class="v-cp card">
            <h6 class="font-weight-bold">${json.clasificaciones[i].clasificación}: ${json.clasificaciones[i].cantidad} </h6>`;
    if (json.clasificaciones[i].observacion != "") {
      html += `<div class="v-comentario">
                <p>${json.clasificaciones[i].observacion}</p>
            </div>`;
    }
    html += `</div>`;
  }

  html += `<div class="v-comentario"><p>Observaciones Generales: <br>${json.observacionesGenerales}</p></div>`;
  return html;
}

/** genera el parte en formato texto para ser enviado a Whatsapp
 * @param json formato de datos
 * @returns {string} Listo para enviar a mensaje de Whatsapp
 */
function parteTexto(json) {
  let texto = `*Municipio: ${json.municipio}*\n
    Día: ${json.fecha} \n\n
    Pacientes:`;

  for (let i = 0; i < json.clasificaciones.length; i++) {
    texto += `${json.clasificaciones[i].clasificación}: ${json.clasificaciones[i].cantidad} \n`;
    if (json.clasificaciones[i].observacion != "") {
      texto += `_Observacion: ${json.clasificaciones[i].observacion}_\n`;
    }
    texto += "\n";
  }

  if (json.observacionesGenerales) {
    texto += `_ Observaciones Generales: \n ${json.observacionesGenerales}_`;
  }

  return texto;
}
