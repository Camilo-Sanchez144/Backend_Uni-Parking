import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/use-cases/AddUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/GetUserByIdUseCase";
import { validateRegisterUser } from "../validations/RegisterUser.validation";
import { verifyFirebaseToken } from "../../../../shared/auth/verifyFirebaseToken";
import { getFirebaseAuth } from "../../../../shared/config/firebase";
import { RestoreUserUseCase } from "../../application/use-cases/RestoreUserUseCase";
import { GetAllUsersUnactiveUseCase } from "../../application/use-cases/GetAllUsersUnactiveUseCase";

export class UserController{
    constructor(
        private readonly addUser: AddUserUseCase,
        private readonly getAllUsers: GetAllUsersUseCase,
        private readonly getUserById: GetUserByIdUseCase,
        private readonly deleteUser: DeleteUserUseCase,
        private readonly restoreUser: RestoreUserUseCase,
        private readonly getAllUsersUnactive: GetAllUsersUnactiveUseCase
    ){}

    createUser = async (req: Request, res: Response) => {
        const DEFAULT_ROLE_ID = 3;
        try {
            const decoded = await verifyFirebaseToken(req.headers.authorization);
            const { error, value } = validateRegisterUser(req.body);
            if (error) {
            res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
            return;
            }
            await getFirebaseAuth().setCustomUserClaims(decoded.uid, { rolId: DEFAULT_ROLE_ID });
            const user = await this.addUser.execute({
            id: decoded.uid,          
            name: value.name,          
            email: decoded.email!,     
            roleId: DEFAULT_ROLE_ID,
            });
            res.status(201).json(user);
        }catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    } 
    findAll = async (req:Request, res:Response) => {
        try{
            const users = await this.getAllUsers.execute();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const userId = String(req.params.userId);
            const user = await this.getUserById.execute(userId);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }
    getUsersUnactive= async(req: Request, res: Response) => {
        try {
            const users = await this.getAllUsersUnactive.execute()
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }
    activeUser = async(req: Request, res: Response) => {
        try {
            const userId = String(req.params.userId);
            const user = await this.restoreUser.execute(userId);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json({ message: 'User activado' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }
    deleteUserById = async(req: Request, res: Response) => {
        try {
            const userId = String(req.params.userId);
            const user = await this.deleteUser.execute(userId);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json({ message: 'User dado de baja' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }
}