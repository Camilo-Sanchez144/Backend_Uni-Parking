import { DataSource } from "typeorm";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/ports/IUser.repository";
import { UserEntity } from "../persistence/User.Entity";
import { Vehicle } from "../../../Vehicle/domain/entities/Vehicle";

export class UserRepository implements IUserRepository{
    constructor(private readonly dataSource: DataSource){}
    
    async addUser(user: User): Promise<User> {
        const entity = this.toEntity(user);
        const saved = await this.dataSource.getRepository(UserEntity).save(entity);
        return this.toDomain(saved);
    }
    async getUserById(id: string): Promise<User | null> {
        const entity = await this.dataSource.getRepository(UserEntity).findOne({
            where: { id_user: id, status_user: true },
            relations: { vehicles: true }
        });
        if (!entity) return null;
        return this.toDomain(entity);
    }
    async getAllUsers(): Promise<User[]> {
        const entities = await this.dataSource.getRepository(UserEntity).find({
            where:{ status_user: true }, 
            relations: { vehicles: true }
        });
        return entities.map((UserEntity)=>this.toDomain(UserEntity));
    }
    async getAllUserUnactive():Promise<User[]>{
        const entities = await this.dataSource.getRepository(UserEntity).find({
            where:{ status_user: false }, 
            relations: { vehicles: true }
        });
        return entities.map((UserEntity)=>this.toDomain(UserEntity));       
    }
    async restoreUser(id: string): Promise<boolean> {
        const user = await this.dataSource.getRepository(UserEntity).findOneBy({ id_user: id, status_user: false });
        if (!user) {
            throw new Error('No se encontró el usuario o ya está activo');
        }
        await this.dataSource.getRepository(UserEntity).update({ id_user: id }, { status_user: true });
        return true;
    }
    async deleteUser(id:string):Promise<boolean>{
        const user = await this.dataSource.getRepository(UserEntity).findOneBy({id_user: id, status_user: true});
        if(!user){
            throw new Error('No se encontró el usuario');
        }
        await this.dataSource.getRepository(UserEntity).update({id_user:id}, {status_user:false});
        return true;
    }

    private toDomain(entity: UserEntity): User {
        const vehicles: Vehicle[] = entity.vehicles ? entity.vehicles.map(vehicle => new Vehicle(
                vehicle.plate_vehicle,
                vehicle.brand_vehicle,
                vehicle.model_vehicle,
                vehicle.color_vehicle,
                vehicle.type_vehicle,
                vehicle.is_authorized_vehicle,
                entity
            ))
            : [];

        return new User(
            entity.id_user,
            entity.name_user,
            entity.email_user,
            entity.role_id_user,
            vehicles,
            entity.status_user
        );
    }
    private toEntity(user: User): UserEntity {
        const entity = new UserEntity();

        entity.id_user = user.id;
        entity.name_user = user.name;
        entity.email_user = user.email;
        entity.role_id_user = user.roleId;
        entity.status_user = user.status_user;

        return entity;
    }
    
}