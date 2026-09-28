import { UserEntity } from "../../../User/infraestructure/persistence/User.Entity";

export class Incident {
    constructor(
        public id_incidencia: string | undefined,
        public fecha_hora: Date,
        public tipo: string,
        public descripcion: string,
        public estado: string,
        public owner: UserEntity
    ) {}
}