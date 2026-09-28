import { IUserRepository } from "../../domain/ports/IUser.repository";
import { IRoleRepository } from "../../../Role/domain/ports/IRole.repository";
import { ROLE_IDS } from "../../../Role/domain/entities/Role";
import { User } from "../../domain/entities/User";
import { getFirebaseAuth } from "../../../../shared/config/firebase";

/** Error del cambio de rol con el código HTTP que le corresponde. */
export class ChangeUserRoleError extends Error {
  constructor(message: string, readonly statusCode: 400 | 403 | 404) {
    super(message);
  }
}

export type ChangeUserRoleData = {
  /** uid de Firebase del usuario (es el id_user de la base de datos). */
  userId: string;
  /** Rol nuevo. */
  roleId: number;
  /** Rol de quien hace el cambio: el claim `rolId` de su token. */
  requesterRoleId: number;
};

/**
 * Cambia el rol de un usuario en Firebase (claim `rolId`, como scripts/setRol.ts) y en la
 * base de datos, y los deja iguales aunque Firebase falle.
 *
 * Nadie asigna un rol igual o superior al suyo, ni cambia a alguien de su mismo rango o de
 * uno superior: un administrador solo mueve usuarios entre userEstandar y vigilante. El
 * superadmin puede todo.
 *
 * El rol nuevo llega al token cuando este se renueva: al volver a iniciar sesión o, como
 * mucho, en una hora (el cliente puede forzarlo con `getIdToken(true)`).
 */
export class ChangeUserRoleUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute({ userId, roleId, requesterRoleId }: ChangeUserRoleData): Promise<User> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new ChangeUserRoleError("No se encontró el usuario o está dado de baja", 404);
    }

    const role = await this.roleRepository.getRoleWithPermissions(roleId);
    if (!role) {
      throw new ChangeUserRoleError(`El rol ${roleId} no existe`, 400);
    }

    // role_id_user es varchar en la base de datos: llega como texto.
    const currentRoleId = Number(user.roleId);
    const isSuperadmin = requesterRoleId === ROLE_IDS.SUPERADMIN;
    if (!isSuperadmin && (currentRoleId >= requesterRoleId || roleId >= requesterRoleId)) {
      throw new ChangeUserRoleError("No puedes asignar ese rol ni cambiar el rol de ese usuario", 403);
    }

    await this.userRepository.updateRole(userId, roleId);

    try {
      const auth = getFirebaseAuth();
      const { customClaims } = await auth.getUser(userId);
      await auth.setCustomUserClaims(userId, { ...customClaims, rolId: roleId });
    } catch (error) {
      // Firebase no cambió: la base de datos vuelve al rol anterior para no quedar distintas.
      await this.userRepository.updateRole(userId, currentRoleId);
      throw error;
    }

    return new User(user.id, user.name, user.email, roleId, user.vehicles, user.status_user);
  }
}
