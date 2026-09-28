import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "../shared/config/database";
import { getFirebaseAuth } from "../shared/config/firebase";
import { seedPermissions } from "../shared/config/seedPermission";
import { UserRepository } from "../modules/User/infraestructure/adapters/User.repository";
import { RoleRepository } from "../modules/Role/infraestructure/adapters/Role.repository";
import { ChangeUserRoleUseCase } from "../modules/User/application/use-cases/ChangeUserRoleUseCase";
import { ROLE_IDS } from "../modules/Role/domain/entities/Role";

/**
 * Cambia el rol de un usuario desde la consola, en Firebase y en la base de datos, con la misma
 * lógica que PATCH /users/:userId/role. Sirve para crear el primer superadmin, que después
 * asigna los demás roles desde la API. El usuario debe haberse registrado antes (POST /users).
 *
 * Uso:     npx ts-node --transpile-only src/scripts/setRol.ts <correo> <rolId>
 * Ejemplo: npx ts-node --transpile-only src/scripts/setRol.ts persona@uniempresarial.edu.co 4
 * Roles:   1 userEstandar · 2 vigilante · 3 administrador · 4 superadmin
 */
async function main() {
  const [email, roleArg] = process.argv.slice(2);
  const roleId = Number(roleArg);

  if (!email || !Number.isInteger(roleId)) {
    console.error("Uso: npx ts-node --transpile-only src/scripts/setRol.ts <correo> <rolId>");
    process.exit(1);
  }

  await AppDataSource.initialize();

  try {
    // Por si el servidor nunca ha arrancado con esta base: crea los roles y los permisos.
    await seedPermissions(AppDataSource);

    const user = await getFirebaseAuth().getUserByEmail(email);
    const changeRole = new ChangeUserRoleUseCase(new UserRepository(AppDataSource), new RoleRepository(AppDataSource));

    // La consola corre con las credenciales del servidor: equivale a un superadmin.
    await changeRole.execute({ userId: user.uid, roleId, requesterRoleId: ROLE_IDS.SUPERADMIN });
    console.log(`Rol ${roleId} asignado a ${email} en Firebase y en la base de datos.`);
    console.log("La persona debe volver a iniciar sesión para que su token traiga el rol nuevo.");
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
