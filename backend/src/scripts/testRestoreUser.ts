import "dotenv/config";
import { getFirebaseAuth } from "../shared/config/firebase";

async function main() {
  const uid = "Ctj1W2XEcKVNxKt7seae8xvR8fR2";
  await getFirebaseAuth().updateUser(uid, { disabled: false });
  console.log("✅ Usuario reactivado en Firebase");
}

main();