"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
const firebase_1 = require("../../../../shared/config/firebase");
class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.deleteUser(id);
        const userFirebase = await (0, firebase_1.getFirebaseAuth)().updateUser(id, { disabled: true });
        if (!user || !userFirebase) {
            return false;
        }
        return true;
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
//# sourceMappingURL=DeleteUserUseCase.js.map