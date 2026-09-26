import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/use-cases/AddUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/GetUserByIdUseCase";
import { RestoreUserUseCase } from "../../application/use-cases/RestoreUserUseCase";
import { GetAllUsersUnactiveUseCase } from "../../application/use-cases/GetAllUsersUnactiveUseCase";
export declare class UserController {
    private readonly addUser;
    private readonly getAllUsers;
    private readonly getUserById;
    private readonly deleteUser;
    private readonly restoreUser;
    private readonly getAllUsersUnactive;
    constructor(addUser: AddUserUseCase, getAllUsers: GetAllUsersUseCase, getUserById: GetUserByIdUseCase, deleteUser: DeleteUserUseCase, restoreUser: RestoreUserUseCase, getAllUsersUnactive: GetAllUsersUnactiveUseCase);
    createUser: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    getUsersUnactive: (req: Request, res: Response) => Promise<void>;
    activeUser: (req: Request, res: Response) => Promise<void>;
    deleteUserById: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=User.controller.d.ts.map