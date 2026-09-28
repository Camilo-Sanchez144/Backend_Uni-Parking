import { DataSource } from "typeorm";
import { PermissionEntity } from "../../modules/Role/infraestructure/persistence/Permission.Entity";
import { RolePermissionEntity } from "../../modules/Role/infraestructure/persistence/RolePermission.Entity";
import { RoleEntity } from "../../modules/Role/infraestructure/persistence/Role.entity";

const PERMISSIONS = [
  { name_permission: "parking-zone:create", route_permission: "/parking-zones", module_permission: "ParkingZone", description_permission: "Crear zonas de parqueo" },
  { name_permission: "parking-zone:update", route_permission: "/parking-zones/:id", module_permission: "ParkingZone", description_permission: "Actualizar zonas de parqueo" },
  { name_permission: "vehicle:status", route_permission: "/vehicles/status/:plate", module_permission: "Vehicle", description_permission: "Consultar estado de un vehículo" },
  { name_permission: "role:manage", route_permission: "/roles/:id/permissions", module_permission: "Role", description_permission: "Asignar permisos a roles" },
  { name_permission: "parking-zone:read", route_permission: "/parking-zones", module_permission: "ParkingZone", description_permission: "Consultar zonas de parqueo" },
];

export async function seedPermissions(dataSource: DataSource, adminRoleId = 1): Promise<void> {
  // 1. Permisos: los que ya existen se ignoran
    console.log(
    dataSource.getMetadata(RolePermissionEntity).columns.map((c) => c.databaseName)
    );
  await dataSource
    .createQueryBuilder()
    .insert()
    .into(PermissionEntity)
    .values(PERMISSIONS)
    .orIgnore()
    .execute();

  // 2. El rol admin debe existir, si no la FK falla
  const adminRole = await dataSource.getRepository(RoleEntity).findOneBy({ id_role: adminRoleId });
  if (!adminRole) {
    console.warn(`Seed: el rol ${adminRoleId} no existe, se omite la asignación de permisos`);
    return;
  }

  // 3. Asignar todos los permisos al admin (los ya asignados se ignoran)
  const allPermissions = await dataSource.getRepository(PermissionEntity).find();
  await dataSource
    .createQueryBuilder()
    .insert()
    .into(RolePermissionEntity)
    .values(allPermissions.map((p) => ({ id_role: adminRoleId, id_permission: p.id_permission })))
    .orIgnore()
    .execute();
}