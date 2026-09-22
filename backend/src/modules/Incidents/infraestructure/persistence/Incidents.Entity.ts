import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Incidencia')
export class IncidentEntity {

    @PrimaryGeneratedColumn("uuid")
    id_incidencia!: string;

    @Column({ type: "timestamp" })
    fecha_hora!: Date;

    @Column({ type: "varchar", length: 100 })
    tipo!: string;

    @Column({ type: "varchar", length: 500 })
    descripcion!: string;

    @Column({ type: "varchar", length: 50 })
    estado!: string;

    @Column({ type: "uuid" })
    id_usuario!: string;
}