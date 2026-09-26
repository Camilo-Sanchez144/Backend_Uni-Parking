"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/testFirebase.ts
require("dotenv/config");
const firebase_1 = require("../shared/config/firebase");
async function main() {
    try {
        const auth = (0, firebase_1.getFirebaseAuth)();
        const result = await auth.listUsers(1); // trae hasta 1 usuario, solo para probar
        console.log("✅ Conexión real con Firebase confirmada");
        console.log("Usuarios encontrados:", result.users.length);
    }
    catch (error) {
        console.error("❌ Error al conectar con Firebase:", error);
    }
}
main();
//# sourceMappingURL=testFirebase.js.map