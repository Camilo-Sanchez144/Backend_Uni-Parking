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
import { ChangeUserRoleError, ChangeUserRoleUseCase } from "../../application/use-cases/ChangeUserRoleUseCase";
import { validateChangeRole } from "../validations/ChangeRole.validation";
import { DecodedIdToken } from "firebase-admin/auth";

export class UserController{
    constructor(
        private readonly addUser: AddUserUseCase,
        private readonly getAllUsers: GetAllUsersUseCase,
        private readonly getUserById: GetUserByIdUseCase,
        private readonly deleteUser: DeleteUserUseCase,
        private readonly restoreUser: RestoreUserUseCase,
        private readonly getAllUsersUnactive: GetAllUsersUnactiveUseCase,
        private readonly changeUserRole: ChangeUserRoleUseCase
    ){}

    /**
     * POST /users — registra a quien inició sesión con su cuenta institucional. Si ya estaba
     * registrado no le cambia el rol: solo copia a Firebase el que tiene en la base de datos.
     * Los usuarios nuevos empiezan como userEstandar (AddUserUseCase).
     */
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
    /** PATCH /users/:userId/role — cambia el rol en Firebase y en la base de datos. */
    changeRole = async (req: Request, res: Response) => {
        try {
            const { error, value } = validateChangeRole(req.body);
            if (error) {
                res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
                return;
            }
            // authorize ya validó el token y lo dejó decodificado en req.user.
            const requester = (req as any).user as DecodedIdToken;
            const user = await this.changeUserRole.execute({
                userId: String(req.params.userId),
                roleId: value.roleId,
                requesterRoleId: requester.rolId,
            });
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof ChangeUserRoleError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
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