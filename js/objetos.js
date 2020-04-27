function ParteGeneral(){
    this.fecha = '';
    this.municipios = [];
}
function ParteMunicipio(){ //Estructura de Datos Municipio
    this.nombre = '';
    this.activos = 0;
    this.bajas = 0;
    this.coordinacion = 0;
    this.consejosPopulares = [];
    this.nuevos_activos = [];
    this.reportes_baja = [];
    this.comentario = '';
    this.total_ausentes = 0;
    this.total_voluntarios = 0;
    this.total_casas = 0;
    this.total_beneficiados = 0;
}
function ParteConsejoPopular() { //Estructura de Consejo Popular
    this.nombre = '';
    this.estudiantes = 0;
    this.trabajadores = 0;
    this.no_cujae = 0;
    this.ausentes = 0;
    this.beneficiados = 0;
    this.casas = 0;
    this.comentario = '';
}
