import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Access_Record')
export class AccessRecordEntity{

    @PrimaryGeneratedColumn()
    id_access_record!: string | null;

    @Column({ type: "varchar", nullable: true })
    plate_access_record!: string | null;

    @Column({ type: "integer", nullable: true })
    visitor_id_access_record!: number | null;

    @Column({ type: "varchar" })
    zone_type_access_record!: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    entry_date_time_access_record!: Date;

    @Column({ type: "timestamp", nullable: true })
    exit_date_time_access_record!: Date | null;
}