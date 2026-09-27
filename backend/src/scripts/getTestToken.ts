import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAtd1ZbDqa93U5mxNxCsjc8AOL8wunLnzI",
  authDomain: "uniparking-dev.firebaseapp.com",
});

async function main() {
  const auth = getAuth(app);
  const cred = await signInWithEmailAndPassword(auth, "test@test.com", "123456");
  const token = await cred.user.getIdToken();
  console.log(token);
}

main();