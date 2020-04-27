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
    this.comentario = '';
    this.total_ausentes = '';
    this.total_voluntarios = '';
    this.total_casas = '';
    this.total_beneficiados = '';
}
function ParteConsejoPopular() { //Estructura de Consejo Popular
    this.nombre = '';
    this.estudiantes = '';
    this.trabajadores = '';
    this.no_cujae = '';
    this.ausentes = '';
    this.beneficiados = '';
    this.casas = '';
    this.comentario = '';
}
