import "dotenv/config";
import { validatePermissionUseCase } from '../modules/Role/infraestructure/controllers/RolModule.instance';
import { AppDataSource } from "../shared/config/database";

async function main() {
  await AppDataSource.initialize();

  const result = await validatePermissionUseCase.execute(1, "crear_vehiculo");
  console.log("¿Tiene permiso?", result);

  await AppDataSource.destroy();
}

main();