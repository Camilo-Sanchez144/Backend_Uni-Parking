import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { VehicleEntity } from "../../../Vehicle/infraestructure/persistence/Vehicles.Entity";
import { IncidentEntity } from "../../../Incidents/infraestructure/persistence/Incidents.Entity";

@Entity('User')
export class UserEntity{
    @PrimaryColumn({type:'varchar'})
    id_user!: string;

    @Column({type:'varchar'})
    name_user!: string;

    @Column({type:'varchar', unique: true })
    email_user!: string;

    @Column({type:'varchar'})
    role_id_user!:number;

    @OneToMany(() => VehicleEntity, (vehicle) => vehicle.owner)
    vehicles!: VehicleEntity[];

    @OneToMany(()=> IncidentEntity, (incident) => incident.owner)
    incidents!:IncidentEntity[];

    @Column({type:'boolean'})
    status_user!:boolean;
}