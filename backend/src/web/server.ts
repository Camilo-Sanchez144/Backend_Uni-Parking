import { createApp } from "../bootstrap/app";
import { AppDataSource } from "../shared/config/database";

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la BD");
    const app = createApp();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Error conectando a la BD:", err));