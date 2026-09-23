import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('Vehicle')
export class VehicleEntity{

    @PrimaryColumn({type:"uuid"})
    id_vehicle!:string;

    // Solo las motos tienen placa. Postgres admite varios NULL en una columna única,
    // así que scooters y bicicletas conviven sin problema.
    @Column({type:"varchar", length: 50, nullable: true, unique: true})
    plate_vehicle!:string | null;

    @Column({type:"varchar", length: 50, nullable: true})
    brand_vehicle!:string | null;

    @Column({type:"integer", nullable: true})
    model_vehicle!:number | null;

    @Column({type:"varchar", length: 50})
    color_vehicle!: string;

    @Column({type:"varchar", length: 50})
    type_vehicle!:string;

    @Column({type:"boolean"})
    is_authorized_vehicle!:boolean;

    // Propietario institucional. Los vehículos de visitantes no tienen.
    @Column({type:"integer", nullable: true})
    id_owner_vehicle!:number | null;

    // Número grabado en el marco de una bicicleta, cuando lo tiene.
    @Column({type:"varchar", length: 30, nullable: true})
    frame_serial_vehicle!:string | null;
}
