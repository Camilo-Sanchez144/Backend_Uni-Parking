import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('Vehicle')
export class VehicleEntity{

    @PrimaryColumn()
    plate_vehicle!:string;

    @Column()
    brand_vehicle!:string;

    @Column()
    model_vehicle!:number;

    @Column()
    color_vehicle!: string;

    @Column()
    type_vehicle!:string;

    @Column()
    is_authorized_vehicle!:boolean;

    @Column()
    id_owner_vehicle!:number;
}