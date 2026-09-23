import * as joi from 'joi';
export type CreateVehicleData = {
    plate: string;
    brand: string;
    model: number;
    color: string;
    type: string;
    id_owner: number;
};
type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: CreateVehicleData;
};
export declare function validateCreateVehicle(data: any): ValidationResult;
export {};
//# sourceMappingURL=CreateVehicle.validation.d.ts.map