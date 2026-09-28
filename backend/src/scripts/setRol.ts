import "dotenv/config";
import { getFirebaseAuth } from "../shared/config/firebase";

async function main() {
  const auth = getFirebaseAuth();
  const user = await auth.getUserByEmail("test@test.com");
  await auth.setCustomUserClaims(user.uid, { rolId: 1 });
  console.log("Claim actualizado para", user.uid);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});