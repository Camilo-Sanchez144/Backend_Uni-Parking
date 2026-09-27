import { DataSource } from "typeorm";
import { IRoleRepository } from "../../domain/ports/IRole.repository";
import { Role } from "../../domain/entities/Role";
export declare class RoleRepository implements IRoleRepository {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getRoleWithPermissions(roleId: number): Promise<Role | null>;
    hasPermission(roleId: number, action: string): Promise<boolean>;
}
//# sourceMappingURL=Role.repository.d.ts.map