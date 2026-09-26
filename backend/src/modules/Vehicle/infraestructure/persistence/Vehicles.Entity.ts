import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "../../../User/infraestructure/persistence/User.Entity";

@Entity('Vehicle')
export class VehicleEntity{

    @PrimaryColumn({type:"varchar", unique:true})
    plate_vehicle!:string;

    @Column({type:"varchar"})
    brand_vehicle!:string;

    @Column({type:"integer"})
    model_vehicle!:number;

    @Column({type:"varchar"})
    color_vehicle!: string;

    @Column({type:"varchar"})
    type_vehicle!:string;

    @Column({type:"boolean"})
    is_authorized_vehicle!:boolean;

    @ManyToOne(() => UserEntity, (user) => user.vehicles)
    @JoinColumn({ name: "id_owner_vehicle" }) 
    owner!: UserEntity;

}