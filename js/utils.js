/** Formato dd/mm/yyyy para el input de fecha
 * @param date valor obtenido por el input de fecha
 * @returns {string} fecha en formato dd/mm/yyyy
 */
function formatoFecha(date) {
  let dd = "";
  let mm = "";
  let yyyy = "";

  console.log(date, "Fecha");
  for (let i = 0; i < date.length; i++) {
    if (i < 4) {
      yyyy += date[i];
    } else if (i > 4 && i < 7) {
      mm += date[i];
    } else if (i > 7) {
      dd += date[i];
    }
  }

  let newFecha = dd + "/" + mm + "/" + yyyy;
  if (newFecha === "//") {
    let date = new Date();
    newFecha =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }
  return newFecha;
}

function formatoFechaCompleta(date) {
  let fecha = new Date();
  if (!date) {
    fecha = new Date(Date.now());
  }
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let anyo = fecha.getFullYear();
  let horas = fecha.getHours();
  let min = fecha.getMinutes();

  return `${dia}/${mes}/${anyo} ${horas}:${min}`;
}

function notify(msg, desc, status) {
  let s = "warning";
  if (status == "danger" || status == "success") {
    s = status;
  }
  $("body").append(`
            <div class="alert alert-${status} alert-dismissible fade-in fade show" role="alert" id="alerta">
              <strong>${msg}</strong>
              <p>${desc}</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close-alerta">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`);
}
