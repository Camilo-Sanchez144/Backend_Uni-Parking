"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreUserUseCase = void 0;
class RestoreUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.restoreUser(id);
        if (!user)
            return false;
        return true;
    }
}
exports.RestoreUserUseCase = RestoreUserUseCase;
//# sourceMappingURL=RestoreUserUseCase.js.map