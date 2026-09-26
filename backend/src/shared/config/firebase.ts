import { initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getRequiredEnv } from "../utils/env";

let firebaseApp: App;

export function initFirebase(): App {
  if (!firebaseApp) {
    firebaseApp = initializeApp({
      credential: cert({
        projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
        clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
        privateKey: getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
      }),
    });
  }
  return firebaseApp;
}

export function getFirebaseAuth() {
  initFirebase();
  return getAuth();
}