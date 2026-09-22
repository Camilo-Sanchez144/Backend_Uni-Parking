import { DataSource } from "typeorm";
import { Incident } from "../../domain/entities/Incident";
import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { IncidentEntity } from "../persistence/Incidents.Entity";

export class IncidentRepository implements IIncidentRepository {

    constructor(private readonly dataSource: DataSource) {}

    async getAllIncidents(): Promise<Incident[]> {
        const entities = await this.dataSource
            .getRepository(IncidentEntity)
            .find();

        return entities.map((incidentEntity) =>
            this.toDomain(incidentEntity)
        );
    }

    async getIncidentById(id: string): Promise<Incident | null> {
        const entity = await this.dataSource
            .getRepository(IncidentEntity)
            .findOneBy({
                id_incidencia: id
            });

        if (!entity) return null;

        return this.toDomain(entity);
    }

    async addIncident(incident: Incident): Promise<Incident> {
        const entity = this.toEntity(incident);

        const saved = await this.dataSource
            .getRepository(IncidentEntity)
            .save(entity);

        return this.toDomain(saved);
    }

    async updateIncident(
        id: string,
        incident: Partial<Incident>
    ): Promise<Incident> {

        const entity = await this.dataSource
            .getRepository(IncidentEntity)
            .findOneBy({
                id_incidencia: id
            });

        if (!entity) {
            throw new Error("No se encontró la incidencia a actualizar");
        }

        Object.assign(entity, incident);

        const updatedEntity = await this.dataSource
            .getRepository(IncidentEntity)
            .save(entity);

        return this.toDomain(updatedEntity);
    }

    async deleteIncident(id: string): Promise<void> {

        const entity = await this.dataSource
            .getRepository(IncidentEntity)
            .findOneBy({
                id_incidencia: id
            });

        if (!entity) {
            throw new Error("No se encontró la incidencia a eliminar");
        }

        await this.dataSource
            .getRepository(IncidentEntity)
            .delete({
                id_incidencia: id
            });
    }

    private toDomain(entity: IncidentEntity): Incident {
        return new Incident(
            entity.fecha_hora,
            entity.tipo,
            entity.descripcion,
            entity.estado,
            entity.id_usuario
        );
    }

    private toEntity(incident: Incident): IncidentEntity {

        const entity = new IncidentEntity();

        entity.fecha_hora = incident.fecha_hora;
        entity.tipo = incident.tipo;
        entity.descripcion = incident.descripcion;
        entity.estado = incident.estado;
        entity.id_usuario = incident.id_usuario;

        return entity;
    }
}