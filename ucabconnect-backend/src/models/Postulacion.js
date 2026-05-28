class Postulacion {
    constructor(id, idEstudiante, idVacante, estado = 'Enviada') {
        this.id = id;
        this.idEstudiante = idEstudiante;
        this.idVacante = idVacante;
        this.fechaPostulacion = new Date().toISOString();
        this.estado = estado; // Estados posibles: Enviada, En Revisión, Aceptada, Rechazada
    }
}

module.exports = Postulacion;