"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePermissionUseCase = void 0;
class ValidatePermissionUseCase {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async execute(roleId, action) {
        return this.roleRepository.hasPermission(roleId, action);
    }
}
exports.ValidatePermissionUseCase = ValidatePermissionUseCase;
//# sourceMappingURL=ValidatePermissionUseCase.js.map