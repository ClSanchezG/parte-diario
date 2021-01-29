// Valores por defecto y declaracion de objeto
function PuestoMandoCierre() {
  this.fecha = "";
  this.municipio = 0;
  this.pedidos_sium = 0;
  this.atendidos_sium = 0;
  this.clasificaciones = [];
  this.incidencias = "";
  this.pendientes = 0;
}

function ClasificacionesCierre() {
  this.clasificacion = "";
  this.clasificacion_id = 0;
  this.atendidos = 0;
  this.traslados_efectivos = 0;
}

function PuestoMandoDemanda() {
  this.municipio = 0;
  this.fecha = "";
  this.clasificaciones = [];
  this.observacionesGenerales = "";
}

function ClasificacionesDemanda() {
  this.clasificacion = "";
  this.clasificacion_id = 0;
  this.cantidad = 0;
  this.observaciones = "";
}

function ParteGeneral() {
  this.fecha = "";
  this.municipios = [];
}
function ParteMunicipio() {
  //Estructura de Datos Municipio
  this.nombre = "";
  this.activos = 0;
  this.bajas = 0;
  this.coordinacion = 0;
  this.consejosPopulares = [];
  this.nuevos_activos = [];
  this.reportes_baja = [];
  this.comentario = "";
  this.total_ausentes = 0;
  this.total_voluntarios = 0;
  this.total_casas = 0;
  this.total_beneficiados = 0;
}
function ParteConsejoPopular() {
  //Estructura de Consejo Popular
  this.nombre = "";
  this.estudiantes = 0;
  this.trabajadores = 0;
  this.no_cujae = 0;
  this.ausentes = 0;
  this.beneficiados = 0;
  this.casas = 0;
  this.comentario = "";
}

function ParteDonaciones() {
  this.fecha = "";
  this.municipios = [];
}

function ParteDonacionesMunicipio() {
  this.nombre = "";
  this.cujae = 0;
  this.reserva = 0;
  this.incidencias = "";
}
