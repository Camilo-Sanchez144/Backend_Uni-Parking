"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserUseCase = void 0;
const User_1 = require("../../domain/entities/User");
class AddUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const user = new User_1.User(data.id, data.name, data.email, data.roleId);
        return this.userRepository.addUser(user);
    }
}
exports.AddUserUseCase = AddUserUseCase;
//# sourceMappingURL=AddUserUseCase.js.map