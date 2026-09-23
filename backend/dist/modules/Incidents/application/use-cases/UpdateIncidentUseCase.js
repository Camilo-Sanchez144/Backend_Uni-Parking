"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIncidentUseCase = void 0;
class UpdateIncidentUseCase {
    constructor(incidentRepository) {
        this.incidentRepository = incidentRepository;
    }
    async execute(id, data) {
        const updateData = {};
        if (data.fecha_hora !== undefined) {
            updateData.fecha_hora = new Date(data.fecha_hora);
        }
        if (data.tipo !== undefined) {
            updateData.tipo = data.tipo;
        }
        if (data.descripcion !== undefined) {
            updateData.descripcion = data.descripcion;
        }
        if (data.estado !== undefined) {
            updateData.estado = data.estado;
        }
        if (data.id_usuario !== undefined) {
            updateData.id_usuario = data.id_usuario;
        }
        return this.incidentRepository.updateIncident(id, updateData);
    }
}
exports.UpdateIncidentUseCase = UpdateIncidentUseCase;
//# sourceMappingURL=UpdateIncidentUseCase.js.map