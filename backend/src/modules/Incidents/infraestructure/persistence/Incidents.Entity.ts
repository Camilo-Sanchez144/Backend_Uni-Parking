import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../../User/infraestructure/persistence/User.Entity";

@Entity('Incidencia')
export class IncidentEntity {

    @PrimaryGeneratedColumn()
    id_incidencia!: string;

    @Column({ type: "timestamp" })
    fecha_hora!: Date;

    @Column({ type: "varchar", length: 100 })
    tipo!: string;

    @Column({ type: "varchar", length: 500 })
    descripcion!: string;

    @Column({ type: "varchar", length: 50 })
    estado!: string;

    @ManyToOne(() => UserEntity, (user) => user.incidents)
    @JoinColumn({ name: "id_owner_incident" }) 
    owner!: UserEntity;
}