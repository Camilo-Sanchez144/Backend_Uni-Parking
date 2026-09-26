export class Role {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    private readonly permissions: string[]
  ) {}

  hasPermission(action: string): boolean {
    return this.permissions.includes(action);
  }

  listPermissions(): string[] {
    return [...this.permissions];
  }
}