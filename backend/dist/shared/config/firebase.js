"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFirebase = initFirebase;
exports.getFirebaseAuth = getFirebaseAuth;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const env_1 = require("../utils/env");
let firebaseApp;
function initFirebase() {
    if (!firebaseApp) {
        firebaseApp = (0, app_1.initializeApp)({
            credential: (0, app_1.cert)({
                projectId: (0, env_1.getRequiredEnv)("FIREBASE_PROJECT_ID"),
                clientEmail: (0, env_1.getRequiredEnv)("FIREBASE_CLIENT_EMAIL"),
                privateKey: (0, env_1.getRequiredEnv)("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
            }),
        });
    }
    return firebaseApp;
}
function getFirebaseAuth() {
    initFirebase();
    return (0, auth_1.getAuth)();
}
//# sourceMappingURL=firebase.js.map