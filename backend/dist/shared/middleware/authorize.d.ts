import { Request, Response, NextFunction } from "express";
import { ValidatePermissionUseCase } from "../../modules/Role/application/use-cases/ValidatePermissionUseCase";
export declare function authorize(validatePermission: ValidatePermissionUseCase, action: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authorize.d.ts.map