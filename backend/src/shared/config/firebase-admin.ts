/*  ¿Para qué sirve?

    Inicializa el Admin SDK una sola vez, leyendo las credenciales desde variables de entorno (igual que database.ts ya hace con getRequiredEnv)
*/
import * as admin from "firebase-admin";
import { getRequiredEnv } from "../utils/env";

/**
 * App de Firebase Admin. `admin.apps` guarda las apps ya inicializadas: sin este
 * chequeo, cada vez que este archivo se importara (p. ej. en pruebas o con
 * recarga en caliente) intentaría inicializar dos veces y Firebase lanza un error.
 */
function initializeFirebaseAdmin(): admin.app.App {
  if (admin.apps.length && admin.apps[0]) {
    return admin.apps[0];
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
      clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
      // El .env guarda la llave en una sola línea con "\n" escapados (no son saltos
      // de línea reales); aquí se convierten de vuelta, que es lo que espera el SDK.
      privateKey: getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    }),
  });
}

const firebaseApp = initializeFirebaseAdmin();

/** Único punto del backend que verifica tokens y consulta usuarios de Firebase Auth. */
export const firebaseAuth = firebaseApp.auth();