"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFirebaseToken = verifyFirebaseToken;
const firebase_1 = require("../config/firebase");
async function verifyFirebaseToken(authHeader) {
    if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Token no proporcionado");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Token mal formado");
    }
    const decoded = await (0, firebase_1.getFirebaseAuth)().verifyIdToken(token);
    return decoded;
}
//# sourceMappingURL=verifyFirebaseToken.js.map