"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const RegisterUser_validation_1 = require("../validations/RegisterUser.validation");
const verifyFirebaseToken_1 = require("../../../../shared/auth/verifyFirebaseToken");
const firebase_1 = require("../../../../shared/config/firebase");
class UserController {
    constructor(addUser, getAllUsers, getUserById, deleteUser, restoreUser, getAllUsersUnactive) {
        this.addUser = addUser;
        this.getAllUsers = getAllUsers;
        this.getUserById = getUserById;
        this.deleteUser = deleteUser;
        this.restoreUser = restoreUser;
        this.getAllUsersUnactive = getAllUsersUnactive;
        this.createUser = async (req, res) => {
            const DEFAULT_ROLE_ID = 3;
            try {
                const decoded = await (0, verifyFirebaseToken_1.verifyFirebaseToken)(req.headers.authorization);
                const { error, value } = (0, RegisterUser_validation_1.validateRegisterUser)(req.body);
                if (error) {
                    res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
                    return;
                }
                await (0, firebase_1.getFirebaseAuth)().setCustomUserClaims(decoded.uid, { rolId: DEFAULT_ROLE_ID });
                const user = await this.addUser.execute({
                    id: decoded.uid,
                    name: value.name,
                    email: decoded.email,
                    roleId: DEFAULT_ROLE_ID,
                });
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.findAll = async (req, res) => {
            try {
                const users = await this.getAllUsers.execute();
                res.status(200).json(users);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.findById = async (req, res) => {
            try {
                const userId = String(req.params.userId);
                const user = await this.getUserById.execute(userId);
                if (!user) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.getUsersUnactive = async (req, res) => {
            try {
                const users = await this.getAllUsersUnactive.execute();
                res.status(200).json(users);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.activeUser = async (req, res) => {
            try {
                const userId = String(req.params.userId);
                const user = await this.restoreUser.execute(userId);
                if (!user) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                res.status(200).json({ message: 'User activado' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.deleteUserById = async (req, res) => {
            try {
                const userId = String(req.params.userId);
                const user = await this.deleteUser.execute(userId);
                if (!user) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                res.status(200).json({ message: 'User dado de baja' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=User.controller.js.map