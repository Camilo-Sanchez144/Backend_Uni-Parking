import * as joi from 'joi';
import { CreateIncidentData } from './CreateIncident.validation';
export type UpdateIncidentData = Partial<Omit<CreateIncidentData, 'id_usuario'>> & {
    id_usuario?: string;
};
type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: UpdateIncidentData;
};
export declare function validateUpdateIncident(data: any): ValidationResult;
export {};
//# sourceMappingURL=UpdateIncident.validation.d.ts.map