import * as joi from 'joi';
import { CreateVehicleData } from './CreateVehicle.validation';
export type UpdateVehicleData = Partial<Omit<CreateVehicleData, 'plate' | 'id_owner'>>;
type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: UpdateVehicleData;
};
export declare function validateUpdateVehicle(data: any): ValidationResult;
export {};
//# sourceMappingURL=UpdateVehicle.validation.d.ts.map