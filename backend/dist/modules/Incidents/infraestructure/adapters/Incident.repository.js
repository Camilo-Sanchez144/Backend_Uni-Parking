"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentRepository = void 0;
const Incident_1 = require("../../domain/entities/Incident");
const Incidents_Entity_1 = require("../persistence/Incidents.Entity");
class IncidentRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getAllIncidents() {
        const entities = await this.dataSource
            .getRepository(Incidents_Entity_1.IncidentEntity)
            .find();
        return entities.map((incidentEntity) => this.toDomain(incidentEntity));
    }
    async getIncidentById(id) {
        const entity = await this.dataSource
            .getRepository(Incidents_Entity_1.IncidentEntity)
            .findOneBy({
            id_incidencia: id
        });
        if (!entity)
            return null;
        return this.toDomain(entity);
    }
    async addIncident(incident) {
        const entity = this.toEntity(incident);
        const saved = await this.dataSource
            .getRepository(Incidents_Entity_1.IncidentEntity)
            .save(entity);
        return this.toDomain(saved);
    }
    async updateIncident(id, incident) {
        const entity = await this.dataSource
            .getRepository(Incidents_Entity_1.IncidentEntity)
            .findOneBy({
            id_incidencia: id
        });
        if (!entity) {
            throw new Error("No se encontró la incidencia a actualizar");
        }
        Object.assign(entity, incident);
        const updatedEntity = await this.dataSource
            .getRepository(Incidents_Entity_1.IncidentEntity)
            .save(entity);
        return this.toDomain(updatedEntity);
    }
    async deleteIncident(id) {
        const entity = await this.dataSource
            .getRepository(Incidents_Entity_1.IncidentEntity)
            .findOneBy({
            id_incidencia: id
        });
        if (!entity) {
            throw new Error("No se encontró la incidencia a eliminar");
        }
        await this.dataSource
            .getRepository(Incidents_Entity_1.IncidentEntity)
            .delete({
            id_incidencia: id
        });
    }
    toDomain(entity) {
        return new Incident_1.Incident(entity.id_incidencia, entity.fecha_hora, entity.tipo, entity.descripcion, entity.estado, entity.id_usuario);
    }
    toEntity(incident) {
        const entity = new Incidents_Entity_1.IncidentEntity();
        if (incident.id_incidencia !== undefined) {
            entity.id_incidencia = incident.id_incidencia;
        }
        entity.fecha_hora = incident.fecha_hora;
        entity.tipo = incident.tipo;
        entity.descripcion = incident.descripcion;
        entity.estado = incident.estado;
        entity.id_usuario = incident.id_usuario;
        return entity;
    }
}
exports.IncidentRepository = IncidentRepository;
//# sourceMappingURL=Incident.repository.js.map