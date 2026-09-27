import { IRoleRepository } from "../../domain/ports/IRole.repository";

export class ValidatePermissionUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(roleId: number, action: string): Promise<boolean> {
    return this.roleRepository.hasPermission(roleId, action);
  }
}