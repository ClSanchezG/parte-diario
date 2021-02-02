// Esta es la forma en que se crean los partes, se almacenan las cosas en un objeto y despues se transforma a html y a texto
/** Acción del botón de Crear Parte
 */
function crearParte() {
  let parte = new ParteTareas();
  parte.fecha = Date.now(); //Fecha

  //parte.municipio = municipio.val(); //Municipio
  parte.universidad = universidad.val(); //Universidad

  parte.total_voluntarios = $("#t-voluntarios").val() || 0;

  let tareas = $(".covid-form");
  console.log(tareas);
  for (let i = 0; i < tareas.length; i++) {
    let v = tareas[i].querySelector(".tarea").checked;
    console.log("v", v);
    if (v) {
      let tarea = tareas[i].querySelector(".tarea-label").value;
      parte.tareas.push(tarea);
    }
  }

  //Comprobar si el numero de activos es mayor que el total de voluntarios
  //if (parte.activos >= parte.total_voluntarios) {
  //formato para Web y Whatsapp
  let html = parteHTML(parte);
  let texto = parteTexto(parte);

  //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML

  let area = $("#vista-previa").addClass("card");
  area.html(html);

  //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
  area.append(
    `<textarea class="form-control" id="copytextarea">${texto}</textarea>`
  );
  area.append(
    `<a class="btn btn-info" href="https://telegram.me/share/url?url=${encodeURI(
      "Parte Semanal"
    )}&text=${encodeURIComponent(
      texto
    )}" target="_blank" action="share/telegram/share" >
      Enviar por Telegram
      </a>`
  );

  area.append(
    `<button class="btn btn-secondary " id="textareacopybtn" onclick="copyToClipboard()">
      Copiar al Portapapeles
      </button>`
  );

  //window.localStorage.setItem("parte", JSON.stringify(parte));
  //console.log(parte);
  //console.log(parteHtml);
  //console.log(parteTexto);
}
/** Genera el parte en formato HTML
 * @param json formato de datos
 * @returns {string} listo para añadir al elemento contenedor
 */
function parteHTML(json) {
  const fechaActual = formatoFechaCompleta(json.fecha);

  let html = `
      <h4 class="font-weight-bold">${json.universidad}</h4>
      <h5>Día: ${fechaActual}</h5>
      <h6><i class="fa fa-chevron-right"></i>  total voluntarios: ${json.total_voluntarios}</h6>
       <h5>Tareas: </h5>`;
  for (let i = 0; i < json.tareas.length; i++) {
    html += `<h6>${json.tareas[i]}</h6>`;
  }

  return html;
}

/** genera el parte en formato texto para ser enviado a Whatsapp
 * @param json formato de datos
 * @returns {string} Listo para enviar a mensaje de Whatsapp
 */
function parteTexto(json) {
  const fechaActual = formatoFechaCompleta(json.fecha);

  let texto = `**${json.universidad}**\n
  🗓 Fecha: ${fechaActual} \n
  💚 Total de voluntarios: ${json.total_voluntarios} \n
  📝 Tareas:\n`;

  for (let i = 0; i < json.tareas.length; i++) {
    texto += `   • ${json.tareas[i]}\n`;
  }

  return texto;
}
