import { Request, Response, NextFunction } from "express";
import { verifyFirebaseToken } from "../auth/verifyFirebaseToken";
import { AppDataSource } from "../config/database";
import { RoleRepository } from "../../modules/Role/infraestructure/adapters/Role.repository";
import { ValidatePermissionUseCase } from "../../modules/Role/application/use-cases/ValidatePermissionUseCase";

export function authorize(validatePermission: ValidatePermissionUseCase, action: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let decoded;
    
    try {
      
      decoded = await verifyFirebaseToken(req.headers.authorization);
    } catch {
      res.status(401).json({ error: "Token inválido o expirado" });
      return;
    }

    const roleId = decoded.rolId;
    if (typeof roleId !== "number") {
      res.status(403).json({ error: "Usuario sin rol asignado" });
      return;
    }

    try {
        console.log("rolId del token:", roleId, "| acción pedida:", action);
        const hasPermissionn = await validatePermission.execute(roleId, action);
        console.log("resultado:", hasPermissionn);
      const hasPermission = await validatePermission.execute(roleId, action);
      if (!hasPermission) {
        res.status(403).json({ error: "No autorizado" });
        return;
      }
      
    } catch (err) {
      res.status(500).json({ error: "Error al validar permisos" });
      return;
    }
    (req as any).user = decoded;
    next();
    
  };
}
const roleRepository = new RoleRepository(AppDataSource);
export const validatePermission = new ValidatePermissionUseCase(roleRepository);