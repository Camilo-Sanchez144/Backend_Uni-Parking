import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('Vehicle')
export class VehicleEntity{

    @PrimaryColumn({type:"varchar", length: 50})
    plate_vehicle!:string;

    @Column({type:"varchar", length: 50})
    brand_vehicle!:string;

    @Column({type:"integer", length: 50})
    model_vehicle!:number;

    @Column({type:"varchar", length: 50})
    color_vehicle!: string;

    @Column({type:"varchar", length: 50})
    type_vehicle!:string;

    @Column({type:"boolean", length: 50})
    is_authorized_vehicle!:boolean;

    @Column({type:"varchar", length: 50})
    id_owner_vehicle!:number;
}