import { User } from "../entities/User";
export interface IUserRepository {
    addUser(user: User): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    getAllUserUnactive(): Promise<User[]>;
    restoreUser(id: string): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
}
//# sourceMappingURL=IUser.repository.d.ts.map