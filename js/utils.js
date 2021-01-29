/** Formato dd/mm/yyyy para el input de fecha
 * @param date valor obtenido por el input de fecha
 * @returns {string} fecha en formato dd/mm/yyyy
 */
function formatoFecha(date) {
  let dd = "";
  let mm = "";
  let yyyy = "";
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
