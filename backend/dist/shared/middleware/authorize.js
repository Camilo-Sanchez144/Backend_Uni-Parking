"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const verifyFirebaseToken_1 = require("../auth/verifyFirebaseToken");
function authorize(validatePermission, action) {
    return async (req, res, next) => {
        try {
            const decoded = await (0, verifyFirebaseToken_1.verifyFirebaseToken)(req.headers.authorization);
            const roleId = decoded.rolId;
            if (roleId === undefined) {
                res.status(403).json({ error: "Usuario sin rol asignado" });
                return;
            }
            const hasPermission = await validatePermission.execute(roleId, action);
            if (!hasPermission) {
                res.status(403).json({ error: "No autorizado" });
                return;
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            res.status(401).json({ error: "Token inválido o expirado" });
        }
    };
}
//# sourceMappingURL=authorize.js.map