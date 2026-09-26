"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersUnactiveUseCase = void 0;
class GetAllUsersUnactiveUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        await this.userRepository.getAllUserUnactive();
    }
}
exports.GetAllUsersUnactiveUseCase = GetAllUsersUnactiveUseCase;
//# sourceMappingURL=GetAllUsersUnactiveUseCase.js.map