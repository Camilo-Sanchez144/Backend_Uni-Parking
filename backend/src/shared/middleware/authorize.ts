import { Request, Response, NextFunction } from "express";
import { verifyFirebaseToken } from "../auth/verifyFirebaseToken";
import { ValidatePermissionUseCase } from "../../modules/Role/application/use-cases/ValidatePermissionUseCase";

export function authorize(validatePermission: ValidatePermissionUseCase, action: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = await verifyFirebaseToken(req.headers.authorization);
      const roleId = decoded.rolId as number;

      if (roleId === undefined) {
        res.status(403).json({ error: "Usuario sin rol asignado" });
        return;
      }

      const hasPermission = await validatePermission.execute(roleId, action);
      if (!hasPermission) {
        res.status(403).json({ error: "No autorizado" });
        return;
      }

      (req as any).user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
}