"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const firebase_1 = require("../shared/config/firebase");
async function main() {
    const uid = "Ctj1W2XEcKVNxKt7seae8xvR8fR2";
    await (0, firebase_1.getFirebaseAuth)().setCustomUserClaims(uid, { rolId: 1 });
    console.log("✅ Rol asignado correctamente");
}
main();
//# sourceMappingURL=setRol.js.map