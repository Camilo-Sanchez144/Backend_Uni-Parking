import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { VehicleEntity } from "../../../Vehicle/infraestructure/persistence/Vehicles.Entity";

@Entity('Visitor')
export class VisitorModel{

    @PrimaryColumn({type:"uuid"})
    id_visitor!:string;

    @Column({type:"varchar", length: 40})
    first_name_visitor!:string;

    @Column({type:"varchar", length: 40})
    last_name_visitor!:string;

    @Column({type:"varchar", length: 10})
    document_type_visitor!:string;

    // Texto, no número: conserva los ceros a la izquierda y no depende del tamaño del entero.
    // Sin restricción de unicidad: una misma persona genera un registro por cada visita.
    @Column({type:"varchar", length: 20})
    document_number_visitor!:string;

    @Column({type:"varchar", length: 160})
    reason_visitor!:string;

    @Column({type:"boolean", default: false})
    is_authorized_visitor!:boolean;

    @Column({type:"uuid"})
    id_vehicle_visitor!:string;

    @ManyToOne(() => VehicleEntity, { nullable: false })
    @JoinColumn({ name: "id_vehicle_visitor" })
    vehicle!:VehicleEntity;

    @Column({type:"timestamptz"})
    created_at_visitor!:Date;

    // Null mientras el visitante sigue dentro; se llena al registrar la salida.
    @Column({type:"timestamptz", nullable: true})
    exited_at_visitor!:Date | null;
}
