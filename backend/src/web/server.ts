import { createApp } from "../bootstrap/app";
import { AppDataSource } from "../shared/config/database";
import { seedPermissions } from "../shared/config/seedPermission";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Conectado a la BD");
  } catch (err) {
    console.error("Error conectando a la BD:", err);
    process.exit(1);
  }

  try {
    await seedPermissions(AppDataSource, 1);
    console.log("Permisos sincronizados");
  } catch (err) {
    console.error("Error ejecutando el seed de permisos:", err);
    process.exit(1);
  }

  const app = createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

main();