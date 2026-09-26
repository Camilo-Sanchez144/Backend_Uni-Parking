import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn,PrimaryGeneratedColumn } from "typeorm";
import { VehicleEntity } from "../../../Vehicle/infraestructure/persistence/Vehicles.Entity";

@Entity('Visitor')
export class VisitorEntity{

    @PrimaryGeneratedColumn()
    id_visitor!:number;

    @Column({type:"varchar", length: 40})
    first_name_visitor!:string;

    @Column({type:"varchar", length: 40})
    last_name_visitor!:string;

    @Column({type:"varchar", length: 10})
    document_type_visitor!:string;

    @Column({type:"varchar", length: 20})
    document_number_visitor!:string;

    @Column({type:"varchar", length: 160})
    reason_visitor!:string;

    @Column({type:"varchar", nullable: true})
    plate_vehicle_visitor!:string;

    @Column({type:"varchar"})
    brand_vehicle!:string;
    
    @Column({type:"integer"})
    model_vehicle!:number;
    
    @Column({type:"varchar"})
    color_vehicle!: string;

    @Column({type:"varchar"})
    type_vehicle!:string;

    @Column({type:"timestamptz"})
    created_at_visitor!:Date;

    // Null mientras el visitante sigue dentro; se llena al registrar la salida.
    @Column({type:"timestamptz", nullable: true})
    exited_at_visitor!:Date | null;
}
