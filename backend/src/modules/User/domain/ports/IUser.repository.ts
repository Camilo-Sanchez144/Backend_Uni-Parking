import { User } from "../entities/User";

export interface IUserRepository{
    addUser(user:User):Promise<User>;
    getUserById(id:string):Promise<User | null>;
    getAllUsers():Promise<User[]>;
    getAllUserUnactive():Promise<User[]>;
    restoreUser(id:string):Promise<boolean>;
    deleteUser(id:string):Promise<boolean>;
    /** Cambia solo el rol en la base de datos; el claim de Firebase lo cambia ChangeUserRoleUseCase. */
    updateRole(id:string, roleId:number):Promise<void>;
}