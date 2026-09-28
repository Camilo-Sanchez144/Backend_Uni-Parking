/**
 * Ids fijos de los roles. Firebase guarda el id en el claim `rolId` del token, así que
 * no pueden cambiar. El orden también cuenta: un id mayor tiene más privilegios, y el
 * cambio de rol lo usa para que nadie asigne un rol igual o superior al suyo.
 */
export const ROLE_IDS = {
  USER_ESTANDAR: 1,
  VIGILANTE: 2,
  ADMINISTRADOR: 3,
  SUPERADMIN: 4,
} as const;

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