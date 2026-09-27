"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_controller_1 = require("./User.controller");
const database_1 = require("../../../../shared/config/database");
const User_repository_1 = require("./../adapters/User.repository");
const AddUserUseCase_1 = require("../../application/use-cases/AddUserUseCase");
const GetAllUsersUseCase_1 = require("../../application/use-cases/GetAllUsersUseCase");
const GetUserByIdUseCase_1 = require("../../application/use-cases/GetUserByIdUseCase");
const DeleteUserUseCase_1 = require("../../application/use-cases/DeleteUserUseCase");
const userRepository = new User_repository_1.UserRepository(database_1.AppDataSource);
const UserControllerInstance = new User_controller_1.UserController(new AddUserUseCase_1.AddUserUseCase(userRepository), new GetAllUsersUseCase_1.GetAllUsersUseCase(userRepository), new GetUserByIdUseCase_1.GetUserByIdUseCase(userRepository), new DeleteUserUseCase_1.DeleteUserUseCase(userRepository));
exports.default = UserControllerInstance;
//# sourceMappingURL=User.controller.instance.js.map