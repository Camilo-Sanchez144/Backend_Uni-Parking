import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "../shared/config/database";
import { getFirebaseAuth } from "../shared/config/firebase";
import { seedPermissions } from "../shared/config/seedPermission";
import { UserRepository } from "../modules/User/infraestructure/adapters/User.repository";
import { RoleRepository } from "../modules/Role/infraestructure/adapters/Role.repository";
import { AddUserUseCase } from "../modules/User/application/use-cases/AddUserUseCase";
import { ChangeUserRoleUseCase } from "../modules/User/application/use-cases/ChangeUserRoleUseCase";
import { ROLE_IDS } from "../modules/Role/domain/entities/Role";

/**
 * Crea (o actualiza) los tres usuarios de demostración: uno por rol, con correo y
 * contraseña en Firebase, su fila en la base de datos y el claim `rolId`. Es seguro
 * correrlo varias veces. Sirve para el portafolio, no para producción.
 *
 * Uso: npx ts-node --transpile-only src/scripts/seedDemoUsers.ts
 * La contraseña sale de DEMO_PASSWORD (si no existe, usa la de abajo).
 */
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "Demo2026!";

const DEMO_USERS = [
  { name: "Estudiante Demo", email: "demo.estudiante@uniempresarial.edu.co", roleId: ROLE_IDS.USER_ESTANDAR },
  { name: "Vigilante Demo", email: "demo.vigilante@uniempresarial.edu.co", roleId: ROLE_IDS.VIGILANTE },
  { name: "Administrador Demo", email: "demo.admin@uniempresarial.edu.co", roleId: ROLE_IDS.ADMINISTRADOR },
];

async function main() {
  await AppDataSource.initialize();

  try {
    await seedPermissions(AppDataSource);

    const auth = getFirebaseAuth();
    const users = new UserRepository(AppDataSource);
    const addUser = new AddUserUseCase(users);
    const changeRole = new ChangeUserRoleUseCase(users, new RoleRepository(AppDataSource));

    for (const demo of DEMO_USERS) {
      let firebaseUser;
      try {
        firebaseUser = await auth.getUserByEmail(demo.email);
        await auth.updateUser(firebaseUser.uid, { password: DEMO_PASSWORD, displayName: demo.name });
      } catch {
        firebaseUser = await auth.createUser({
          email: demo.email,
          password: DEMO_PASSWORD,
          displayName: demo.name,
          emailVerified: true,
        });
      }

      if (!(await users.getUserById(firebaseUser.uid))) {
        await addUser.execute({ id: firebaseUser.uid, name: demo.name, email: demo.email });
      }

      await changeRole.execute({
        userId: firebaseUser.uid,
        roleId: demo.roleId,
        requesterRoleId: ROLE_IDS.SUPERADMIN,
      });
      console.log(`${demo.email} -> rol ${demo.roleId}`);
    }

    console.log("Listo. Contraseña de los tres usuarios: la de DEMO_PASSWORD.");
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});