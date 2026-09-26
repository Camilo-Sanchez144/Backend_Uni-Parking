import "dotenv/config";
import { getFirebaseAuth } from "../shared/config/firebase"

async function main() {
  const uid = "Ctj1W2XEcKVNxKt7seae8xvR8fR2";
  await getFirebaseAuth().setCustomUserClaims(uid, { rolId: 1 });
  console.log("✅ Rol asignado correctamente");
}

main();