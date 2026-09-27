import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Parking_Zone')
export class ParkingZoneEntity{

    @PrimaryGeneratedColumn()
    id_parking_zone!: number;

    @Column({ type: "varchar", unique: true })
    vehicle_type_parking_zone!: string;

    @Column({ type: "integer" })
    total_capacity_parking_zone!: number;

    @Column({ type: "integer" })
    available_spaces_parking_zone!: number;
}