"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../bootstrap/app");
const database_1 = require("../shared/config/database");
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("Conectado a la BD");
    const app = (0, app_1.createApp)();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
})
    .catch((err) => console.error("Error conectando a la BD:", err));
//# sourceMappingURL=server.js.map