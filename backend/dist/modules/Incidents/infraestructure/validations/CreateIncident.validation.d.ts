import * as joi from 'joi';
export type CreateIncidentData = {
    fecha_hora: string;
    tipo: string;
    descripcion: string;
    estado: string;
    id_usuario: string;
};
type ValidationResult = {
    error: joi.ValidationError | undefined;
    value: CreateIncidentData;
};
export declare function validateCreateIncident(data: any): ValidationResult;
export {};
//# sourceMappingURL=CreateIncident.validation.d.ts.map