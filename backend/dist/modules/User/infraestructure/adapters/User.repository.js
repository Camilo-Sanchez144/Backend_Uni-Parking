"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../../domain/entities/User");
const User_Entity_1 = require("../persistence/User.Entity");
class UserRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async addUser(user) {
        const entity = this.toEntity(user);
        const saved = await this.dataSource.getRepository(User_Entity_1.UserEntity).save(entity);
        return this.toDomain(saved);
    }
    async getUserById(id) {
        const entity = await this.dataSource.getRepository(User_Entity_1.UserEntity).findOneBy({ id_user: id, status_user: true });
        if (!entity)
            return null;
        return this.toDomain(entity);
    }
    async getAllUsers() {
        const entities = await this.dataSource.getRepository(User_Entity_1.UserEntity).find({ where: { status_user: true } });
        return entities.map((UserEntity) => this.toDomain(UserEntity));
    }
    async getAllUserUnactive() {
        const entities = await this.dataSource.getRepository(User_Entity_1.UserEntity).find({ where: { status_user: false } });
        return entities.map((UserEntity) => this.toDomain(UserEntity));
    }
    async restoreUser(id) {
        const user = await this.dataSource.getRepository(User_Entity_1.UserEntity).findOneBy({ id_user: id, status_user: false });
        if (!user) {
            throw new Error('No se encontró el usuario o ya está activo');
            return false;
        }
        await this.dataSource.getRepository(User_Entity_1.UserEntity).update({ id_user: id }, { status_user: true });
        return true;
    }
    async deleteUser(id) {
        const user = await this.dataSource.getRepository(User_Entity_1.UserEntity).findOneBy({ id_user: id, status_user: true });
        if (!user) {
            throw new Error('No se encontró el usuario');
            return false;
        }
        await this.dataSource.getRepository(User_Entity_1.UserEntity).update({ id_user: id }, { status_user: false });
        return true;
    }
    toDomain(entity) {
        return new User_1.User(entity.id_user, entity.name_user, entity.email_user, entity.role_id_user, entity.vehicles.map(vehicle => vehicle.plate_vehicle), entity.status_user);
    }
    toEntity(user) {
        const entity = new User_Entity_1.UserEntity();
        entity.id_user = user.id;
        entity.name_user = user.name;
        entity.email_user = user.email;
        entity.role_id_user = user.roleId;
        entity.status_user = user.status_user;
        return entity;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=User.repository.js.map