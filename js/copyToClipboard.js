function copyToClipboard() {
  var copyTextareaBtn = $("#textareacopybtn");
  var copyTextarea = $("#copytextarea");

  copyTextarea.focus();
  copyTextarea.select();
  var msg = "Oops, no se pudo copiar";
  var status = "danger";
  var desc = "";
  try {
    if (document.execCommand("copy")) {
      status = "success";
      msg = "Wiiii, copiado con éxito";
    }
  } catch (err) {
    console.error("NO se pudo copiar");
  }
  notify(msg, "", status);
}
