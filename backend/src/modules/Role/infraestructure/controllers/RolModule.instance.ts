import { AppDataSource } from "../../../../shared/config/database";
import { RoleRepository } from "../adapters/Role.repository";
import { ValidatePermissionUseCase } from "../../application/use-cases/ValidatePermissionUseCase";

const roleRepository = new RoleRepository(AppDataSource);

export const validatePermissionUseCase = new ValidatePermissionUseCase(roleRepository);