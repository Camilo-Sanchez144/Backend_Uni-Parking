// scripts/testFirebase.ts
import "dotenv/config";
import { getFirebaseAuth } from "../shared/config/firebase";

async function main() {
  try {
    const auth = getFirebaseAuth();
    const result = await auth.listUsers(1); // trae hasta 1 usuario, solo para probar
    console.log("✅ Conexión real con Firebase confirmada");
    console.log("Usuarios encontrados:", result.users.length);
  } catch (error) {
    console.error("❌ Error al conectar con Firebase:", error);
  }
}

main();