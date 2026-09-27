"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const app = (0, app_1.initializeApp)({
    apiKey: "AIzaSyAtd1ZbDqa93U5mxNxCsjc8AOL8wunLnzI",
    authDomain: "uniparking-dev.firebaseapp.com",
});
async function main() {
    const auth = (0, auth_1.getAuth)(app);
    const cred = await (0, auth_1.signInWithEmailAndPassword)(auth, "test@test.com", "123456");
    const token = await cred.user.getIdToken();
    console.log(token);
}
main();
//# sourceMappingURL=getTestToken.js.map