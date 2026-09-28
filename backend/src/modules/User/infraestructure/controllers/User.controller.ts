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
        let decoded: Awaited<ReturnType<typeof verifyFirebaseToken>>;
        try {
            decoded = await verifyFirebaseToken(req.headers.authorization);
        } catch {
            res.status(401).json({ error: "Token inválido o ausente" });
            return;
        }

        const email = decoded.email;
        if (typeof email !== "string" || !/^[^@\s]+@uniempresarial\.edu\.co$/i.test(email)) {
            res.status(403).json({ error: "Se requiere un correo institucional" });
            return;
        }

        const { error, value } = validateRegisterUser(req.body);
        if (error) {
            res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
            return;
        }

        try {
            let user = await this.getUserById.executeIncludingInactive(decoded.uid);
            let isNewUser = false;

            if (user === null) {
                user = await this.addUser.execute({
                    id: decoded.uid,
                    name: value.name,
                    email,
                });
                isNewUser = true;
            }

            const roleId = Number(user.roleId);
            if (!Number.isSafeInteger(roleId) || roleId < 1) {
                throw new Error("El usuario tiene un rol inválido en PostgreSQL");
            }

            const firebaseAuth = getFirebaseAuth();
            const firebaseUser = await firebaseAuth.getUser(decoded.uid);
            await firebaseAuth.setCustomUserClaims(decoded.uid, {
                ...(firebaseUser.customClaims ?? {}),
                rolId: roleId,
            });

            res.status(isNewUser ? 201 : 200).json(user);
        } catch (error) {
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