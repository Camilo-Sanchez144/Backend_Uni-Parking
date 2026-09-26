import { IRoleRepository } from "../../domain/ports/IRole.repository";
export declare class ValidatePermissionUseCase {
    private readonly roleRepository;
    constructor(roleRepository: IRoleRepository);
    execute(roleId: number, action: string): Promise<boolean>;
}
//# sourceMappingURL=ValidatePermissionUseCase.d.ts.map