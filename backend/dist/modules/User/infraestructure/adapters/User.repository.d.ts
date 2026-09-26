import { DataSource } from "typeorm";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/ports/IUser.repository";
export declare class UserRepository implements IUserRepository {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    addUser(user: User): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    getAllUserUnactive(): Promise<User[]>;
    restoreUser(id: string): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
    private toDomain;
    private toEntity;
}
//# sourceMappingURL=User.repository.d.ts.map