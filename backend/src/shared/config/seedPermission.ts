import { DataSource, EntityManager, In } from "typeorm";
import { PermissionEntity } from "../../modules/Role/infraestructure/persistence/Permission.Entity";
import { RolePermissionEntity } from "../../modules/Role/infraestructure/persistence/RolePermission.Entity";
import { RoleEntity } from "../../modules/Role/infraestructure/persistence/Role.entity";
import { ROLE_IDS } from "../../modules/Role/domain/entities/Role";

/**
 * Roles, permisos y qué permisos tiene cada rol.
 *
 * Este archivo es la fuente de verdad: cada vez que arranca el servidor, la base de datos
 * queda igual a estas listas. Se agrega lo que falta, se actualiza lo que cambió y se borra
 * lo que ya no está; así, quitarle aquí un permiso a un rol se lo quita de verdad.
 *
 * Cada ruta protegida tiene su permiso y lo exige con `authorize(validatePermission, "<permiso>")`.
 * Dos rutas son públicas a propósito, y por eso no tienen permiso:
 * - POST /visitors: el visitante llena el formulario sin tener cuenta.
 * - POST /users: quien se registra todavía no tiene rol (ahí mismo se le asigna userEstandar);
 *   la ruta sí exige un token válido de Firebase.
 */

type PermissionSeed = Pick<
  PermissionEntity,
  "name_permission" | "route_permission" | "module_permission" | "description_permission"
>;

type RoleSeed = Pick<RoleEntity, "id_role" | "name_role" | "description_role">;

function permission(name: string, route: string, module: string, description: string): PermissionSeed {
  return { name_permission: name, route_permission: route, module_permission: module, description_permission: description };
}

/** Un permiso por ruta protegida: "<método> <ruta>" tal como la monta bootstrap/app.ts. */
export const PERMISSIONS: PermissionSeed[] = [
  // Vehículos de la comunidad (/vehicles)
  permission("vehicle:read", "GET /vehicles", "Vehicle", "Listar los vehículos autorizados"),
  permission("vehicle:read-deauthorized", "GET /vehicles/deauthorized", "Vehicle", "Listar los vehículos sin autorización"),
  permission("vehicle:read-one", "GET /vehicles/:plate", "Vehicle", "Consultar un vehículo por su placa"),
  permission("vehicle:create", "POST /vehicles", "Vehicle", "Registrar un vehículo"),
  permission("vehicle:update", "PUT /vehicles/:plate", "Vehicle", "Actualizar los datos de un vehículo"),
  permission("vehicle:authorize", "PATCH /vehicles/:plate", "Vehicle", "Autorizar el ingreso de un vehículo"),
  permission("vehicle:deauthorize", "DELETE /vehicles/:plate", "Vehicle", "Quitar la autorización de un vehículo"),

  // Usuarios (/users)
  permission("user:read", "GET /users", "User", "Listar los usuarios activos"),
  permission("user:read-inactive", "GET /users/unactive", "User", "Listar los usuarios dados de baja"),
  permission("user:read-one", "GET /users/:userId", "User", "Consultar un usuario con sus vehículos"),
  permission("user:restore", "PUT /users/:userId", "User", "Reactivar un usuario dado de baja"),
  permission("user:deactivate", "DELETE /users/:userId", "User", "Dar de baja un usuario"),
  permission("user:change-role", "PATCH /users/:userId/role", "User", "Cambiar el rol de un usuario en Firebase y en la base de datos"),

  // Visitantes (/visitors)
  permission("visitor:read", "GET /visitors", "Visitor", "Listar los visitantes"),
  permission("visitor:read-one", "GET /visitors/:id", "Visitor", "Consultar un visitante por el id que lleva su QR"),
  permission("visitor:exit", "PATCH /visitors/:id/exit", "Visitor", "Marcar la salida de un visitante (ruta anterior al módulo Parking)"),

  // Incidencias (/incidents)
  permission("incident:read", "GET /incidents", "Incident", "Listar las incidencias"),
  permission("incident:read-one", "GET /incidents/:id", "Incident", "Consultar una incidencia"),
  permission("incident:create", "POST /incidents", "Incident", "Reportar una incidencia"),
  permission("incident:update", "PUT /incidents/:id", "Incident", "Actualizar una incidencia"),
  permission("incident:delete", "DELETE /incidents/:id", "Incident", "Eliminar una incidencia"),

  // Ingresos y salidas (/parking)
  permission("access-record:read-open", "GET /parking/records/open", "Parking", "Ver quién está dentro: registros sin salida"),
  permission("access-record:historical", "GET /parking/historical/:plate", "Parking", "Consultar los ingresos y salidas de una placa"),
  permission("vehicle:status", "GET /parking/status/:plate", "Parking", "Consultar si un vehículo está dentro"),
  permission("access-record:entry", "POST /parking/entry/:plate", "Parking", "Registrar el ingreso de un vehículo de la comunidad"),
  permission("access-record:exit", "PATCH /parking/exit/:plate", "Parking", "Registrar la salida de un vehículo de la comunidad"),
  permission("access-record:visitor-entry", "POST /parking/entry/visitor/:visitorId", "Parking", "Registrar el ingreso de un visitante al leer su QR"),
  permission("access-record:visitor-exit", "PATCH /parking/exit/visitor/:visitorId", "Parking", "Registrar la salida de un visitante"),

  // Zonas de parqueo (/parkingZone)
  permission("parking-zone:read", "GET /parkingZone", "ParkingZone", "Consultar las zonas de parqueo y sus puestos libres"),
  permission("parking-zone:read-by-type", "GET /parkingZone/:typeVehicle", "ParkingZone", "Consultar la zona de un tipo de vehículo"),
  permission("parking-zone:create", "POST /parkingZone", "ParkingZone", "Crear zonas de parqueo"),
  permission("parking-zone:update", "PATCH /parkingZone/:idParkingZone", "ParkingZone", "Actualizar zonas de parqueo"),
];

/** Roles con sus ids fijos: Firebase guarda el id en el claim `rolId`. */
export const ROLES: RoleSeed[] = [
  { id_role: ROLE_IDS.USER_ESTANDAR, name_role: "userEstandar", description_role: "Estudiante, docente o administrativo con vehículos registrados" },
  { id_role: ROLE_IDS.VIGILANTE, name_role: "vigilante", description_role: "Personal de seguridad: registra ingresos y salidas en portería" },
  { id_role: ROLE_IDS.ADMINISTRADOR, name_role: "administrador", description_role: "Administra vehículos, usuarios, zonas e incidencias; asigna los roles userEstandar y vigilante" },
  { id_role: ROLE_IDS.SUPERADMIN, name_role: "superadmin", description_role: "Acceso total, incluido asignar cualquier rol" },
];

const ALL_PERMISSIONS = PERMISSIONS.map((item) => item.name_permission);

/**
 * Qué puede hacer cada rol (tabla RolePermission).
 *
 * El userEstandar solo recibe permisos que no exponen datos de otras personas: para
 * `access-record:historical`, `GethistoricalByPlateUseCase` comprueba que la placa
 * consultada sea de su propia cuenta (PEN-030). `access-record:read-open` sigue sin
 * dársele: expone las placas de todo el mundo y todavía no hay una versión que solo
 * cuente, sin identificarlas.
 */
export const ROLE_PERMISSIONS: Record<number, readonly string[]> = {
  [ROLE_IDS.USER_ESTANDAR]: [
    "parking-zone:read",
    "parking-zone:read-by-type",
    "vehicle:create",
    "user:read-one",
    "access-record:historical",
  ],
  [ROLE_IDS.VIGILANTE]: [
    // Lo que usa hoy el panel de seguridad del frontend.
    "parking-zone:read",
    "parking-zone:read-by-type",
    "access-record:read-open",
    "access-record:entry",
    "access-record:exit",
    "access-record:visitor-entry",
    "access-record:visitor-exit",
    "access-record:historical",
    "vehicle:status",
    "vehicle:read",
    "vehicle:read-deauthorized",
    "vehicle:read-one",
    "visitor:read",
    "visitor:read-one",
    // Portería reporta las novedades del parqueadero.
    "incident:read",
    "incident:read-one",
    "incident:create",
  ],
  // Con user:change-role, el administrador solo puede asignar userEstandar y vigilante (ChangeUserRoleUseCase).
  [ROLE_IDS.ADMINISTRADOR]: ALL_PERMISSIONS,
  [ROLE_IDS.SUPERADMIN]: ALL_PERMISSIONS,
};

/** Lo que quedó en la base de datos después de sincronizar. */
export type SeedSummary = { roles: number; permissions: number; assignments: number };

/**
 * Deja la base de datos igual a PERMISSIONS, ROLES y ROLE_PERMISSIONS. Todo va en una
 * transacción, así que si algo falla no queda a medias, y se puede correr las veces que sea.
 *
 * Solo administra los roles de ROLES: si la base tiene otros roles, los deja como están.
 *
 * @throws Error si un rol de ROLE_PERMISSIONS menciona un permiso que no está en PERMISSIONS.
 */
export async function seedPermissions(dataSource: DataSource): Promise<SeedSummary> {
  checkRolePermissions();

  return dataSource.transaction(async (manager) => {
    const permissionIds = await syncPermissions(manager);
    await syncRoles(manager);
    const assignments = await syncRolePermissions(manager, permissionIds);

    return { roles: ROLES.length, permissions: permissionIds.size, assignments };
  });
}

/** Falla al arrancar si un rol menciona un permiso que no existe, p. ej. por un error de tipeo. */
function checkRolePermissions(): void {
  const known = new Set(ALL_PERMISSIONS);

  for (const [roleId, names] of Object.entries(ROLE_PERMISSIONS)) {
    const unknown = names.filter((name) => !known.has(name));
    if (unknown.length) {
      throw new Error(`Seed: el rol ${roleId} tiene permisos que no están en PERMISSIONS: ${unknown.join(", ")}`);
    }
  }
}

/**
 * Agrega, actualiza y borra permisos hasta que coincidan con PERMISSIONS. También borra los
 * repetidos: el seed anterior insertaba otra vez los mismos permisos en cada arranque.
 *
 * @returns El id de cada permiso, por nombre.
 */
async function syncPermissions(manager: EntityManager): Promise<Map<string, number>> {
  const repository = manager.getRepository(PermissionEntity);
  const wanted = new Map(PERMISSIONS.map((item) => [item.name_permission, item]));
  const kept = new Map<string, PermissionEntity>();
  const toDelete: number[] = [];

  for (const existing of await repository.find({ order: { id_permission: "ASC" } })) {
    if (wanted.has(existing.name_permission) && !kept.has(existing.name_permission)) {
      kept.set(existing.name_permission, existing);
    } else {
      toDelete.push(existing.id_permission);
    }
  }

  if (toDelete.length) {
    // La llave foránea de RolePermission borra en cascada las asignaciones de estos permisos.
    await repository.delete({ id_permission: In(toDelete) });
  }

  // Siempre copias: TypeORM le escribe los ids generados a los objetos que recibe, y las
  // listas de este archivo no deben cambiar entre una sincronización y otra.
  const missing = PERMISSIONS.filter((item) => !kept.has(item.name_permission));
  if (missing.length) {
    await repository.insert(missing.map((item) => ({ ...item })));
  }

  for (const [name, existing] of kept) {
    const { route_permission, module_permission, description_permission } = wanted.get(name)!;
    const changed =
      existing.route_permission !== route_permission ||
      existing.module_permission !== module_permission ||
      existing.description_permission !== description_permission;

    if (changed) {
      await repository.update(
        { id_permission: existing.id_permission },
        { route_permission, module_permission, description_permission },
      );
    }
  }

  const all = await repository.find();
  return new Map(all.map((item) => [item.name_permission, item.id_permission]));
}

/** Crea los roles con sus ids fijos, o les corrige el nombre y la descripción. */
async function syncRoles(manager: EntityManager): Promise<void> {
  // SQL directo: TypeORM deja por fuera del INSERT las columnas autogeneradas aunque traigan
  // valor, y aquí el id tiene que ser exactamente el de ROLE_IDS.
  const rows = ROLES.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(", ");
  const params = ROLES.flatMap((role) => [role.id_role, role.name_role, role.description_role]);

  await manager.query(
    `INSERT INTO "Role" (id_role, name_role, description_role) VALUES ${rows}
     ON CONFLICT (id_role) DO UPDATE SET name_role = EXCLUDED.name_role, description_role = EXCLUDED.description_role`,
    params,
  );

  // Los ids se escribieron a mano: la secuencia de la columna debe seguir después del mayor,
  // para que un rol creado más adelante sin id no choque con estos.
  await manager.query(`SELECT setval(pg_get_serial_sequence('"Role"', 'id_role'), (SELECT MAX(id_role) FROM "Role"))`);
}

/**
 * Deja a cada rol de ROLES exactamente con los permisos de ROLE_PERMISSIONS.
 *
 * @returns Cuántas asignaciones rol-permiso quedaron para esos roles.
 */
async function syncRolePermissions(manager: EntityManager, permissionIds: Map<string, number>): Promise<number> {
  const repository = manager.getRepository(RolePermissionEntity);
  let assignments = 0;

  for (const role of ROLES) {
    const wanted = new Set((ROLE_PERMISSIONS[role.id_role] ?? []).map((name) => permissionIds.get(name)!));
    const current = await repository.findBy({ id_role: role.id_role });

    const extra = current.filter((row) => !wanted.has(row.id_permission)).map((row) => row.id_permission);
    if (extra.length) {
      await repository.delete({ id_role: role.id_role, id_permission: In(extra) });
    }

    const have = new Set(current.map((row) => row.id_permission));
    const missing = [...wanted].filter((id) => !have.has(id));
    if (missing.length) {
      await repository.insert(missing.map((id_permission) => ({ id_role: role.id_role, id_permission })));
    }

    assignments += wanted.size;
  }

  return assignments;
}
