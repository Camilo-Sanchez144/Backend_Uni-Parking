import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { Incident } from "../../domain/entities/Incident";
import { CreateIncidentData } from "../../infraestructure/validations/CreateIncident.validation";
import { UserEntity } from "../../../User/infraestructure/persistence/User.Entity";

export class AddIncidentUseCase {

    constructor(
        private readonly incidentRepository: IIncidentRepository
    ) {}

    async execute(data: CreateIncidentData): Promise<Incident> {

        // Para guardar la relación, TypeORM solo necesita el id del usuario dueño.
        const owner = new UserEntity();
        owner.id_user = data.id_usuario;

        const incident = new Incident(
            undefined,
            new Date(data.fecha_hora),
            data.tipo,
            data.descripcion,
            data.estado,
            owner
        );

        return this.incidentRepository.addIncident(incident);
    }
}