export declare class Role {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    private readonly permissions;
    constructor(id: number, name: string, description: string, permissions: string[]);
    hasPermission(action: string): boolean;
    listPermissions(): string[];
}
//# sourceMappingURL=Role.d.ts.map