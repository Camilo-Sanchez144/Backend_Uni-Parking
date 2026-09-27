import "dotenv/config";
import { getFirebaseAuth } from "../shared/config/firebase";

export async function RestoreUserFirebase() {
  const uid = "Ctj1W2XEcKVNxKt7seae8xvR8fR2";
  await getFirebaseAuth().updateUser(uid, { disabled: false });
}

//main();